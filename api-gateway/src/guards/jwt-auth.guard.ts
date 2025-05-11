import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class JwtRpcAuthGuard implements CanActivate {

    constructor(
        private jwtService: JwtService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const rpc = context.switchToRpc();
        const data = rpc.getData();

        const authHeader = data?.headers?.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new HttpException('Missing or invalid authorization header', HttpStatus.UNAUTHORIZED);
        }

        const token = authHeader.split(' ')[1];

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: 'secretKey_123456',
            });
            data.user = payload; // attach to context if needed
            return true;
        } catch (error) {
            throw new RpcException('Invalid or expired token');
        }
    }
}