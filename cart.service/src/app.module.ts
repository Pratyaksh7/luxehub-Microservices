import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './carts/carts.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[CartModule,
    MongooseModule.forRoot('mongodb://localhost/luxehub'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
