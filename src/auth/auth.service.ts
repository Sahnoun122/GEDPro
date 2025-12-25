import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { User, Role } from 'src/users/users.entity';
import { loginDto } from './dto/login.dto';
import { OrganisationService } from 'src/organisation/organisation.service';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private organisationService: OrganisationService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(dto.email);

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const organisation = await this.organisationService.create({
      name: dto.organisation_name,
    });

    const hash = await bcrypt.hash(dto.password, 10);

    const user = await this.usersService.create({
      firstname: dto.firstname,
      lastname: dto.lastname,
      email: dto.email,
      password: hash,
      role: Role.admin_rh,
      organisation: organisation,
    });

    return this.generateToken(user);
  }

  async login(dto: loginDto) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) {
      throw new BadRequestException('Email ou mot de passe invalide');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Email ou mot de passe invalide');
    }

    return this.generateToken(user);
  }

  generateToken(user: User) {
    return {
      access_token: this.jwtService.sign({
        sub: user.id,
        role: user.role,
        organisation_id: user.organisation.id,
      }),
    };
  }
}
