import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AddressModule } from './address/address.module';

@Module({
  imports: [UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    AddressModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
