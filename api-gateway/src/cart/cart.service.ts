import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class CartService {
    private client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://localhost:5672'],
                queue: 'cart_service_queue'
            }
        })
    }

    public getCartItems(user) {
        const command = {
            user
        }
        return this.client.send<any, any>("getCartItems", command)
    }

    public getCartTotal(user) {
        const command = {
            user
        }
        return this.client.send<any, any>("getCartTotal", command)
    }

    public getWishList(user) {
        const command = {
            user
        }
        return this.client.send<any, any>("getWishList", command)
    }

    public addToCart(user, body) {
        const command = {
            user,
            body
        }
        return this.client.send<any, any>("addToCart", command)
    }

    public addToWishList(user, body) {
        const command = {
            user,
            body
        }
        return this.client.send<any, any>("addToWishList", command)
    }

    public updateItemQtyInCart(user, body) {
        const command = {
            user,
            body
        }
        return this.client.send<any, any>("updateItemQtyInCart", command)
    }

    public removeFromCart(user, productId) {
        const command = {
            user,
            productId
        }
        return this.client.send<any, any>("removeFromCart", command)
    }

    public removeFromWishList(user, productId) {
        const command = {
            user,
            productId
        }
        return this.client.send<any, any>("removeFromWishList", command)
    }
}
