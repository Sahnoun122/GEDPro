import { Body,Post, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { dot } from 'node:test/reporters';
@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.AuthService.register(dto);
  }

  @Post('login')
  login(@Body() dto: loginDto) {
    return this.AuthService.login(dto);
  }
}
