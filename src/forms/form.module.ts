
import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormEntity } from './form.entity';
import { JwtModule } from '@nestjs/jwt'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([FormEntity]),
    JwtModule.register({ secret: 'SECRET', signOptions: { expiresIn: '1h' } }), 
  ],
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {}
