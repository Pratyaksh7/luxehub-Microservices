import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from './interfaces/auth.interface';
import { LoginUserDto } from './dto/login.user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthServiceService {
    constructor(
        @InjectModel('Auth') 
        private authModel: Model<Auth>,
        private jwtService: JwtService
    ) { }

    async signup(createUserDto: CreateUserDto) {
        const createUser = await new this.authModel(createUserDto);
        return createUser.save();
    }

    async validateExistUser(email: string) {
        const existingUser = await this.authModel.findOne({ email })
        if (existingUser) {
            return existingUser;
        }
        return null;
    }

    async signin(user: any) {
        let payload = {
            id: user.id,
            email: user.email,
            name: user.name
        }

        var token = this.jwtService.sign(payload)
        return { access_token: token }
    }

    async validateUser(loginUserDto: LoginUserDto) {
        const { email, password } = loginUserDto;
        const user = await this.authModel.findOne({ email, password });
        if (user) {
            if (user.password === password) {
                return user;
            }
        }
        return null;
    }

    async getName(user: any){
        return user
    }
}
