import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class ProductsService {
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

    public listProducts() {
        return this.client.send<any, any>("listProducts", {})
    }

    public listCategories() {
        return this.client.send<any, any>("listCategories", {})
    }

    public createProduct(command) {
        return this.client.send<any, any>("createProduct", command)
    }
    
    public searchProduct(command) {
        return this.client.send<any, any>("searchProduct", command)
    }   

    public getAProduct(command) {
        return this.client.send<any, any>("getAProduct", command)
    }  

    public updateAProduct(productId,body) {
        const command = {
            productId,
            body
        }
        return this.client.send<any, any>("updateAProduct", command)
    }  

    public deleteAProduct(command) {
        return this.client.send<any, any>("deleteAProduct", command)
    }  
}
