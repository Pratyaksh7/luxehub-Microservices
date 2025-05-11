import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {

    constructor(
        @InjectModel('Product')
        private productModel: Model<any>
    ) { }



    async listProducts() {
        return await this.productModel.find();
    }

    async listCategories() {
        const allProducts = await this.listProducts();
        if (!allProducts.length) {
            return {
                success: false,
                message: 'Categories not found.'
            }
        }
        const all_categories = allProducts.reduce((categories, product) => {
            return categories.concat(product.categories);
        }, []);
        const uniqueCategories = Array.from(new Set(all_categories));
        return uniqueCategories
    }

    async createProduct(body: any) {
        const createProduct = await new this.productModel(body);
        return createProduct.save();
    }

    async searchProduct(body: any) {
        const { keywords, category } = body;

        const query: any = {};
        if (keywords) {
            query.$or = [
                { name: { $regex: keywords, $options: "i" } },
                { description: { $regex: keywords, $options: "i" } },
                { tags: { $regex: keywords, $options: "i" } },
            ];
        }
        if (category) {
            query.categories = category;
        }

        const products = await this.productModel.find(query);
        if (!products.length) {
            return {
                success: false,
                message: "No Data Found.",
                data: []
            }
        }
        return products;
    }

    async getAProduct(productId: string) {
        const product = await this.productModel.findById(productId);
        if (!product) {
            return {
                success: false,
                message: 'Product not found.'
            }
        }

        return product;
    }

    async updateAProduct(productId: string, body: any) {

        const updatedProduct = await this.productModel.findByIdAndUpdate(productId, body,
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            return {
                success: false,
                message: 'Product not found.'
            }
        }
        return updatedProduct;
    }

    async deleteAProduct(productId: string) {
        const product = await this.productModel.findByIdAndDelete(productId);
        if (!product) {
            return {
                success: false,
                message: 'Product not found.'
            }
        }
        return product;
    }
}
