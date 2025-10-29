import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    // UsersModule,
    // JwtModule.registerAsync({
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     global: true,
    //     secret: configService.get<string>(JWTEnvs.JWT_SECRET),
    //   }),
    // }),
  ],
  controllers: [AuthController],
  // providers: [AuthService, StringUtilService, MailUtilService],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
