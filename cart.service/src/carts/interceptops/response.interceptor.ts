import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { RESPONSE_MESSAGE_KEY } from "src/common/decorators/response-message.decorator";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {

    constructor(private readonly reflector: Reflector) { }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        const responseMessage = this.reflector.get(RESPONSE_MESSAGE_KEY, context.getHandler(),);

        return next.handle().pipe(
            map(data => {
                const response = context.switchToHttp().getResponse();
                const { statusCode } = response;

                if (typeof data === 'object' && 'success' in data) {
                    if (data.success) {
                        return {
                            statusCode,
                            message: responseMessage || 'Request Successful',
                            data
                        }
                    } else {
                        return {
                            statusCode,
                            message: data?.message || 'No data found',
                            data: []
                        }
                    }
                }


                return {
                    statusCode,
                    message: responseMessage || 'Request Successful',
                    data
                }
            })
        )
    }
}