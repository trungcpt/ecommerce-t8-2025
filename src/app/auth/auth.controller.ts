import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  // @SkipAuth()
  // @ZodResponse({ type: SignInResponseDto })
  async signIn(
    @Body() signInDto: SignInDto,
    // @Res({ passthrough: true }) res: Response,
  ) {
    console.log('>>> check', signInDto);
    // const data = await this.authService.signIn(signInDto);
    // res.cookie(TokenKeys.ACCESS_TOKEN_KEY, data.accessToken, {
    //   ...COOKIE_CONFIG_DEFAULT,
    //   maxAge: ms(CookiesToken.ACCESS_TOKEN_EXPIRE_IN),
    // });
    // res.cookie(TokenKeys.REFRESH_TOKEN_KEY, data.refreshToken, {
    //   ...COOKIE_CONFIG_DEFAULT,
    //   maxAge: ms(CookiesToken.REFRESH_TOKEN_EXPIRE_IN),
    // });
    // return data;
  }
}
