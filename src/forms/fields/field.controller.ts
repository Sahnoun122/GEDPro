import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { FieldService } from './field.service';
import { CreateFieldDto } from './dto/create-field.dto';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role

 } from 'src/users/users.entity';
@Controller('forms/:formId')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FieldController {
  constructor(private readonly service: FieldService) {}

  @Post()
  @Roles(Role.admin_rh)
  create(@Param('formId') formId: string, @Body() dto: CreateFieldDto) {
    return this.service.create(formId, dto);
  }
}
