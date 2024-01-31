import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot("mongodb://localhost/nesths-auth")
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
