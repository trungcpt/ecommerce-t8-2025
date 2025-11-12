import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { LoggerModule } from '../logger/logger.module';
import { LoggingInterceptor } from '../logger/logging.interceptor';
import { ZodExceptionFilter } from '../catch-everything/zod-exception/zod-exception.filter';
import { ApiUtilModule } from '../common/utils/api-util/api-util.module';
import { CatchEverythingFilter } from '../catch-everything/catch-everything.filter';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../common/prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';
import { AccessControlGuard } from '../common/guards/access-control/access-control.guard';
import { FormatResponseInterceptor } from '../common/interceptors/format-response/format-response.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolePermissionsModule } from './role-permissions/role-permissions.module';
import { QueryUtilModule } from '../common/utils/query-util/query-util.module';
import { FileUtilModule } from '../common/utils/file-util/file-util.module';
import { VendorsModule } from './vendors/vendors.module';
import { UserVendorRolesModule } from './user-vendor-roles/user-vendor-roles.module';
import { ProductImagesModule } from './product-images/product-images.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventsModule } from '../events/events.module';
import { CacheUtilModule } from '../common/utils/cache-util/cache-util.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      // validate: validate,
    }),
    LoggerModule,
    PrismaModule,
    UsersModule,
    ApiUtilModule,
    AuthModule,
    RolesModule,
    PermissionsModule,
    RolePermissionsModule,
    QueryUtilModule,
    FileUtilModule,
    VendorsModule,
    UserVendorRolesModule,
    ProductImagesModule,
    ProductsModule,
    EventEmitterModule.forRoot(),
    EventsModule,
    CacheUtilModule,
  ],
  controllers: [AppController, ProductsController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AccessControlGuard,
    },
    ZodExceptionFilter,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: FormatResponseInterceptor,
    },
  ],
})
export class AppModule {}
