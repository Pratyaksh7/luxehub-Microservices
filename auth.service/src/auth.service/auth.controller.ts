import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthServiceService } from './auth.service';
import { CreateUserDto } from './dto/create.user.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { ExistAuthGuard } from './guards/exist-auth.guard';
import { LoginAuthGuard } from './guards/login-auth.guard';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthServiceController {
    constructor(private readonly authservice: AuthServiceService) { }


    // @Post('signup')
    @UseGuards(ExistAuthGuard)
    @MessagePattern('register')
    async signup(command) {
        return this.authservice.signup(command.body)
    }

    // @Post('signin')
    @UseGuards(LoginAuthGuard)
    @MessagePattern('login')
    async signin(command) {
        const user = command.user;
        return this.authservice.signin(user);

    }

    // @Get('name')
    @MessagePattern('getName')
    getName(@Payload() data: any) {
        return this.authservice.getName(data.user);
    }
}
