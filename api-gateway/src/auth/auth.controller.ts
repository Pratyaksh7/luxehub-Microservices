import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtRpcAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('signup')
    async register(@Request() req){
        return this.authService.register({ body: req.body})
    }

    @Post('signin')
    async login(@Request() req){
        return this.authService.login({ body: req.body})
    }

    @Get('name')
    @UseGuards(JwtRpcAuthGuard)
    async getName(@Request() req){
        return this.authService.getName({ user: req.user })
    }
}
