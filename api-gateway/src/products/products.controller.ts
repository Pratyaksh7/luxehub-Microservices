import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtRpcAuthGuard } from 'src/guards/jwt-auth.guard';
import { ProductsService } from './products.service';

@Controller('products')
@UseGuards(JwtRpcAuthGuard)
export class ProductsController {
    constructor(private readonly productsService: ProductsService){}

    @Get()
    async listProducts(@Request() req) {
        const user = req.user;              // to access the user from the token
        return this.productsService.listProducts();
    }

    @Get('/categories')
    async listCategories(@Request() req) {
        const user = req.user;   
        return this.productsService.listCategories()
    }

    @Post()
    async createProduct(@Request() req, @Body() body:any){
        const user = req.user;   
        return this.productsService.createProduct(body)
    }

    @Post('/search')
    async searchProduct(@Request() req, @Body() body:any){
        const user = req.user;   
        return this.productsService.searchProduct(body)
    }
    
    /** Dynamic Routes below */
    @Get(':productId')
    async getAProduct(@Request() req, @Param('productId') productId: string){
        const user = req.user;   
        return this.productsService.getAProduct(productId)
    }

    @Put(':productId')
    async updateAProduct(@Request() req, @Param('productId') productId: string, @Body() body:any){
        const user = req.user;   
        return this.productsService.updateAProduct(productId, body)
    }

    @Delete(':productId')
    async deleteAProduct(@Request() req, @Param('productId') productId: string){
        const user = req.user;   
        return this.productsService.deleteAProduct(productId)
    }
}
