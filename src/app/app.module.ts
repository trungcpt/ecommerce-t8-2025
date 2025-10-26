import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { UserModule } from './users/users.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerModule } from '../logger/logger.module';
import { LoggingInterceptor } from '../logger/logging.interceptor';
import { ZodExceptionFilter } from '../catch-everything/zod-exception/zod-exception.filter';
import { ApiUtilModule } from '../common/utils/api-util/api-util.module';
import { CatchEverythingFilter } from '../catch-everything/catch-everything.filter';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      // validate: validate,
    }),
    LoggerModule,
    UserModule,
    ApiUtilModule,
  ],
  controllers: [AppController, ProductsController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    ZodExceptionFilter,
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
  ],
})
export class AppModule {}
