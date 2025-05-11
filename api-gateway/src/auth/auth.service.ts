import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class AuthService {
    private client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://localhost:5672'],
                queue: 'auth_and_product_service_queue'
            }
        })
    }

    public register(command) {
        return this.client.send<any, any>("register", command)
    }

    public login(command) {
        return this.client.send<any, any>("login", command)
    }

    public getName(command) {
        return this.client.send<any, any>("getName", command)
    }
}
