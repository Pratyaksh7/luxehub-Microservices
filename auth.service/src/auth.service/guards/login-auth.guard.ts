import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthServiceService } from "../auth.service";
import { LoginUserDto } from "../dto/login.user.dto";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class LoginAuthGuard implements CanActivate {
    constructor(private readonly authService: AuthServiceService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const { email, password } = request.body;
        if (!email || !password) {
            throw new RpcException({
                statusCode: 400,
                message: 'Email, Password both required.',
            });
            return false
        }
        var loginDto: LoginUserDto = {
            email: email,
            password: password
        }
        const user = await this.authService.validateUser(loginDto);
        if (!user) {
            throw new RpcException({
                statusCode: 400,
                message: 'This user not exists.',
            });
            return false
        }
        request.user = user;
        return true;
    }
}