import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.entity';
import { loginDto } from './dto/login.dto';
import { Error } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const userExist = await this.usersService.findByEmail(dto.email);
    if (userExist) {
      throw new BadRequestException('User already exists');
    }

    const hash = await bcrypt.hash(dto.password, 10);

    const user = await this.usersService.create({
      ...dto,
      password: hash,
    });

    return this.generToken(user);
  }


  async login(dto : loginDto){
    const user = await this.usersService.findByEmail(dto.email)
    if(!user) throw new Error('invalide email ou mot de passe ')

      const hashpassword = await bcrypt.compare(dto.password , user.password);
      if(!hashpassword) throw new Error('invalide email ou mot de passe ')

        return this.generToken(user)
  }

  generToken(user : User){
    return{
      access_token : this.jwtService.sign({
        sub: user.id ,
        role: user.role
      })
    }
  }
}
