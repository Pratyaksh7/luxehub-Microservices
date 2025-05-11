import { Controller } from "@nestjs/common";
import { CartService } from "./carts.service";
import { MessagePattern } from "@nestjs/microservices";
import { ResponseMessage } from "src/common/decorators/response-message.decorator";

@Controller('cart')

export class CartController {
    constructor(private readonly cartService: CartService) { }

    @MessagePattern('getCartItems')
    @ResponseMessage('Shopping cart retrieved successfully')
    async getCartItems(command: any) {
        const { user } = command;
        return this.cartService.getCartItems(user)
    }

    @MessagePattern('getCartTotal')
    @ResponseMessage('Total cost retrieved successfully')
    async getCartTotal(command: any) {
        const { user } = command;
        return this.cartService.getCartTotal(user)
    }

    @MessagePattern('getWishList')
    @ResponseMessage('Data found.')
    async getWishList(command: any) {
        const { user } = command;
        return this.cartService.getWishList(user)
    }

    @MessagePattern('addToCart')
    @ResponseMessage('Item added to cart successfully.')
    async addToCart(command: any) {
        const { user, body } = command;
        return this.cartService.addToCart(user, body)
    }

    @MessagePattern('addToWishList')
    @ResponseMessage('Product added to wishlist successfully')
    async addToWishList(command: any) {
        const { user, body } = command;
        return this.cartService.addToWishList(user, body)
    }

    @MessagePattern('updateItemQtyInCart')
    @ResponseMessage('Item quantities updated in the cart successfully')
    async updateItemQtyInCart(command: any) {
        const { user, body } = command;
        return this.cartService.updateItemQtyInCart(user, body)
    }

    @MessagePattern('removeFromCart')
    @ResponseMessage('Item removed from the shopping cart.')
    async removeFromCart(command: any) {
        const { user, productId } = command;
        return this.cartService.removeFromCart(user, productId)
    }

    @MessagePattern('removeFromWishList')
    @ResponseMessage('Product removed from wishlist successfully')
    async removeFromWishList(command: any) {
        const { user, productId } = command;
        return this.cartService.removeFromWishList(user, productId)
    }
    
}