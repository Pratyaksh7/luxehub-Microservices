import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
      JwtModule.register({
        secret: 'secretKey_123456',
        signOptions: { expiresIn: '10000s' },
      })
    ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
