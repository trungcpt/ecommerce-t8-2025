import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { UserModule } from './users/users.module';
import { LoggerModule } from './logger/logger.module';
import { LoggingInterceptor } from './logger/logging.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [LoggerModule, UserModule],
  controllers: [AppController, ProductsController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
