import { Inject, Injectable } from '@nestjs/common';
import { Repository, Unique } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  findByEmail(email: string) {
    return this.userRepo.findOne({
      where: { email },
    });
  }

  async findByIdWithOrganisation(id: string) {
    return this.userRepo.findOne({
      where: { id },
      relations: ['organisation'],
    });
  }

  create(user: Partial<User>) {
    return this.userRepo.save(user);
  }
}
