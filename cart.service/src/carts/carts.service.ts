import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


@Injectable()
export class CartService {

    constructor(
        @InjectModel('ShoppingCart')
        private cartModal: Model<any>,

        @InjectModel('Wishlist')
        private wishlistModal: Model<any>
    ) { }

    // helper functions 
    async findExistingCart(userId: string) {
        const existingCart = await this.cartModal.findOne({ userId });
        return existingCart
    }

    async findExistingWishlist(userId: string) {
        const existingWishlist = await this.wishlistModal.findOne({ userId });
        return existingWishlist
    }

    // Routes function calls below
    async getCartItems(user: any) {
        const cart = await this.findExistingCart(user?.id);
        if (!cart) {
            return {
                // success: false,
                message: "Cart empty.",
                data: []
            }
        }

        return cart
    }

    async getCartTotal(user: any) {
        const cart = await this.findExistingCart(user?.id);
        if (!cart) {
            return {
                // success: false,
                message: "Cart empty.",
                data: []
            }
        }
        const total = cart.items.reduce((acc, item) => {
            return acc + (item?.price * item?.quantity);
        }, 0);

        return { totalAmount: total }
    }

    async getWishList(user: any) {
        const wishlist = await this.findExistingWishlist(user?.id);
        if (!wishlist) {
            return {
                // success: false,
                message: "Wislist empty.",
                data: []
            }
        }
        return { data: wishlist }
    }

    async addToCart(user: any, body: any) {
        const {
            id,
            name,
            description,
            categories,
            price,
            currencies,
            stock_qty,
            manufacturer,
            images,
            attributes,
            tags,
            rating,
            reviews,
            quantity,
        } = body.items[0];
        if (!id || !quantity || quantity <= 0) {
            return {
                success: false,
                message: "Invalid input"
            }
        }
        const cart = await this.findExistingCart(user?.id);
        if (!cart) {
            const newItem = await new this.cartModal(body);
            return newItem.save()
        }

        const existingItemIndex = cart.items.findIndex(
            (item) => item.id === id
        );
        if (existingItemIndex !== -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({
                id,
                name,
                description,
                categories,
                price,
                currencies,
                stock_qty,
                manufacturer,
                images,
                attributes,
                tags,
                rating,
                reviews,
                quantity,
            });
        }
        await cart.save()
        return cart
    }

    async addToWishList(user: any, body: any) {
        const {
            id,
            name,
            description,
            categories,
            price,
            currencies,
            stock_qty,
            manufacturer,
            images,
            attributes,
            tags,
            rating,
            reviews,
            quantity,
        } = body.items[0];
        if (!id || !quantity || quantity <= 0) {
            return {
                success: false,
                message: "Invalid input"
            }
        }
        const wishlist = await this.findExistingWishlist(user?.id);
        if (!wishlist) {
            const newItem = await new this.wishlistModal(body);
            return newItem.save()
        }

        const existingItem = wishlist.items.find((item) => item.id === id);

        if (!existingItem) {
            wishlist.items.push({
                id,
                name,
                description,
                categories,
                price,
                currencies,
                stock_qty,
                manufacturer,
                images,
                attributes,
                tags,
                rating,
                reviews,
                quantity: quantity || 1,
            });
        }
        await wishlist.save();
        return wishlist
    }

    async applyDiscountCode(user: any, body: any) {

    }

    async updateItemQtyInCart(user: any, body: any) {
        if (!Array.isArray(body) || body.length === 0) {
            return {
                // success: false,
                message: "Invalid product data"
            }
        }

        const cart = await this.findExistingCart(user?.id);
        if (!cart) {
            return {
                // success: false,
                message: "Cart not found.",
                data: []
            }
        }

        for (const { productId, quantity } of body) {
            if (!quantity || quantity <= 0) {
                return {
                    message: "Invalid quanity."
                }
            }

            const itemIndex = cart.items.findIndex(
                (item) => item.id.toString() === productId
            );

            if (itemIndex === -1) {
                return {
                    message: `Item with productId ${productId} not found in the shopping cart.`,
                }
            }
            cart.items[itemIndex].quantity = quantity;
        }

        await cart.save();
        return cart
    }

    async removeFromCart(user: any, productId: string) {
        const cart = await this.findExistingCart(user?.id);
        if (!cart) {
            return {
                // success: false,
                message: "Cart not found.",
                data: []
            }
        }
        const itemIndex = cart.items.findIndex(
            (item) => item.id.toString() === productId
        );
        if (itemIndex === -1) {
            return {
                message: "Item not found in the shopping cart.",
            }
        }
        cart.items.splice(itemIndex, 1);

        await cart.save();
        return cart

    }

    async removeFromWishList(user: any, productId: string) {
        const wishlist = await this.findExistingWishlist(user?.id);
        if (!wishlist) {
            return {
                // success: false,
                message: "Wishlist not found.",
                data: []
            }
        }
        const itemIndex = wishlist.items.findIndex(
            (item) => item.id.toString() === productId
        );
        if (itemIndex === -1) {
            return {
                message: "Item not found in the wishlist.",
            }
        }
        wishlist.items.splice(itemIndex, 1);

        await wishlist.save();
        return wishlist

    }

}