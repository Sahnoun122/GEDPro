import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Organisation } from './organisation/organisation.entity';
import { FormModule } from './forms/form.module';
import { FormEntity } from './forms/form.entity';
import { FieldEntity } from './forms/fields/field.entity';
import { FieldModule } from './forms/fields/field.module';
import { ResponseModule } from './responses/response.module';
import { ResponseEntity } from './responses/response.entity';
import { MinioModule } from './minio/minio.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'GedPro',
      entities: [User, Organisation, FormEntity, FieldEntity ,ResponseEntity],
      synchronize: true,
    }),
    MongooseModule.forRoot('mongodb://localhost/GedPro'),
    UsersModule,
    AuthModule,
    FormModule,
    FieldModule,
    ResponseModule,
    MinioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
