import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from './entities/candidate.entity';
import { CandidatesService } from './candidate.service';
import { CandidatesController } from './candidate.controller';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([Candidate]),
    JwtModule.register({ secret: 'SECRET', signOptions: { expiresIn: '1h' } }),
  ],
//   imports: [
//     TypeOrmModule.forFeature([FormEntity]),
//     JwtModule.register({ secret: 'SECRET', signOptions: { expiresIn: '1h' } }),
//   ],
  controllers: [CandidatesController],
  providers: [CandidatesService],
})
export class CandidatesModule {}
