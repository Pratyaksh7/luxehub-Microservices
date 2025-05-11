import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthServiceService } from "../auth.service";
import e from "express";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class ExistAuthGuard implements CanActivate {
    constructor(private readonly authService: AuthServiceService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const email = request.body?.email;

        if(!email){
            throw new RpcException({
                statusCode: 400,
                message: 'Email is required.',
              });
            return false
        }
        const isUserExists = await this.authService.validateExistUser(email)
        if(isUserExists){
            throw new RpcException({
                statusCode: 400,
                message: 'User already exists.',
              });
        }
        return true;
    }

}
