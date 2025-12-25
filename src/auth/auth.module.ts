import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'SECRET',
      signOptions: { expiresIn: '1d' },
    }),
    AuthModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
