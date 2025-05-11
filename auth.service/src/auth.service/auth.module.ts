import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth.controller';
import { AuthServiceService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from './schemas/auth.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema}]),
    JwtModule.register({
      secret: 'secretKey_123456',
      signOptions: { expiresIn: '10000s' },
    })
  ],
  controllers: [AuthServiceController],
  providers: [AuthServiceService]
})
export class AuthServiceModule {}
