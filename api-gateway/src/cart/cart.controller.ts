import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtRpcAuthGuard } from 'src/guards/jwt-auth.guard';
import { CartService } from './cart.service';

@Controller('cart')
@UseGuards(JwtRpcAuthGuard)
export class CartController {
    constructor(private readonly cartService: CartService){}

    @Get()
    async getCartItems(@Request() req){
        const user = req.user;

        return this.cartService.getCartItems(user)
    }

    @Get('/total')
    async getCartTotal(@Request() req){
        const user = req.user;

        return this.cartService.getCartTotal(user)
    }

    @Get('/wishlist')
    async getWishList(@Request() req){
        const user = req.user;

        return this.cartService.getWishList(user)
    }

    @Post('/items')
    async addToCart(@Request() req, @Body() body: any){
        const user = req.user;

        return this.cartService.addToCart(user, body)
    }

    @Post('/wishlist')
    async addToWishList(@Request() req, @Body() body: any){
        const user = req.user;

        return this.cartService.addToWishList(user, body)
    }

    @Put('/items')
    async updateItemQtyInCart(@Request() req, @Body() body: any){
        const user = req.user;

        return this.cartService.updateItemQtyInCart(user, body)
    }

    @Delete('/items/:productId')
    async removeFromCart(@Request() req, @Param('productId') productId: string){
        const user = req.user;

        return this.cartService.removeFromCart(user, productId)
    }

    @Delete('/wishlist/:productId')
    async removeFromWishList(@Request() req, @Param('productId') productId: string){
        const user = req.user;

        return this.cartService.removeFromWishList(user, productId)
    }
}
