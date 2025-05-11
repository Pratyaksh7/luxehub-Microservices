import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
   imports: [
        JwtModule.register({
          secret: 'secretKey_123456',
          signOptions: { expiresIn: '10000s' },
        })
      ],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
