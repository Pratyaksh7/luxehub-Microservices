import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './interceptors/response.interceptor';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema}])
  ],
  controllers: [ProductsController],
  providers: [ProductsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    }
  ]
})
export class ProductsModule {}
