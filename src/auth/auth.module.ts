import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { OrganisationModule } from 'src/organisation/organisation.module';

@Module({
  imports: [
    UsersModule,
    OrganisationModule,
    JwtModule.register({
      secret: 'SECRET',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [
    JwtModule, 
    AuthService,
  ],
})
export class AuthModule {}
