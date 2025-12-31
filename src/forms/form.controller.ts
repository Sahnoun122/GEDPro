import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/users/users.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('forms')
export class FormController {
  constructor(private readonly service: FormService) {}

  @Post()
  @Roles(Role.admin_rh)
  create(@Body() dto: CreateFormDto) {
    return this.service.create(dto);
  }

  @Get()
  @Roles(Role.admin_rh)
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles(Role.admin_rh)
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @Roles(Role.admin_rh)
  update(@Param('id') id: string, @Body() dto: UpdateFormDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.admin_rh)
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
