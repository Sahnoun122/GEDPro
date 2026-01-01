import { Controller, Post, Param, Body, UseGuards } from '@nestjs/common';

import { ResponseService } from './response.service';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/users.entity';

@Controller('responses')
@UseGuards(JwtAuthGuard, RolesGuard) 
export class ResponseController {
  constructor(private readonly service: ResponseService) {}

  @Post(':formId')
  @Roles(Role.rh, Role.admin_rh , Role.manager) 
  submit(@Param('formId') formId: string, @Body() answers: any) {
    return this.service.submit(formId, answers);
  }
}
