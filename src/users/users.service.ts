import { Inject, Injectable } from '@nestjs/common';
import { Repository, Unique } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepo : Repository<User>,
    ) {}

    findByEmail(email : string){
        return this.userRepo.findOne({ where: { email } });
}

  create( user : Partial<User>){
    return this.userRepo.save(user)
  }
}
