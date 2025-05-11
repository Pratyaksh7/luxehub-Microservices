import { Module } from "@nestjs/common";
import { CartController } from "./carts.controller";
import { CartService } from "./carts.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ShoppingCartSchema } from "./schemas/shoppingCart.schema";
import { WishlistSchema } from "./schemas/wishlist.schema";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ResponseInterceptor } from "./interceptops/response.interceptor";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'ShoppingCart', schema: ShoppingCartSchema },
            { name: 'Wishlist', schema: WishlistSchema }
        ])
    ],
    controllers: [CartController],
    providers: [CartService,
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor
        }
    ]
})

export class CartModule { }