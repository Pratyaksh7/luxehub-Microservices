import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from 'src/auth.service/guards/jwt-auth.guard';
import { ProductsService } from './products.service';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { MessagePattern } from '@nestjs/microservices';

@Controller('products')
// @UseGuards(JwtAuthGuard)
export class ProductsController {
    constructor(private readonly productsSrevice: ProductsService) {}

    @MessagePattern('listProducts')
    @ResponseMessage('Products Fetched Successfully.')
    async listProducts() {
        return this.productsSrevice.listProducts();
    }

    @MessagePattern('listCategories')
    @ResponseMessage('Categories Fetched Successfully')
    async listCategories() {
        return this.productsSrevice.listCategories();
    }
    
    @MessagePattern('createProduct')
    @ResponseMessage('Product Created Successfully')
    async createProduct(command: any){
        // command is the payload coming from body
        return this.productsSrevice.createProduct(command);
    }

    @MessagePattern('searchProduct')
    @ResponseMessage('Data Found.')
    async searchProduct(command:any){
        return this.productsSrevice.searchProduct(command);
    }

    /** Dynamic Routes below */
    @MessagePattern('getAProduct')
    @ResponseMessage('Product Fetched Successfully.')
    async getAProduct(command: string){
        return this.productsSrevice.getAProduct(command);
    }

    @MessagePattern('updateAProduct')
    @ResponseMessage('Product Updated Successfully.')
    async updateAProduct(command: any){
        const {productId, body} = command;
        return this.productsSrevice.updateAProduct(productId,body);
    }

    @MessagePattern('deleteAProduct')
    @ResponseMessage('Product Deleted Successfully.')
    async deleteAProduct(command: string){
        return this.productsSrevice.deleteAProduct(command);
    }
}
