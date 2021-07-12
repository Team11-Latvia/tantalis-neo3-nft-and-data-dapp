import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { BidModule } from '../bid/bid.module';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { BuyModule } from '../buy/buy.module';
import { CatalogModule } from '../catalog/catalog.module';
import { CreateNftModule } from '../create/create.nft.module';
import { FileUploadModule } from '../file-upload/file.upload.module';
import { NewsSubscriptionModule } from '../news-subscription/news.subscription.module';
import { SellModule } from '../sell/sell.module';
import { StatsModule } from '../stats/stats.module';
import { ServiceStatusModule } from '../status/service.status.module';
import { SystemModule } from '../system/system.module';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.API_DB_HOST,
      port: parseInt(process.env.API_DB_PORT as string, 10),
      database: process.env.API_DB_DATABASE,
      username: process.env.API_DB_USER,
      password: process.env.API_DB_PASSWORD,
      entities: [
        __dirname + '/../entity/*.entity.js',
      ],
      migrations: ['dist/migrations/*{.ts,.js}'],
      migrationsRun: true,
      synchronize: true,
      retryAttempts: 100,
      retryDelay: 5000,
      'cli': {
        migrationsDir: 'src/migration',
      }
    }),
    BlockchainModule,
    AuthModule,
    SystemModule,
    StatsModule,
    NewsSubscriptionModule,
    ServiceStatusModule,
    FileUploadModule,
    UserModule,
    CatalogModule,
    CreateNftModule,
    BidModule,
    BuyModule,
    SellModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
