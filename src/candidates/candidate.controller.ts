import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CandidatesService } from './candidate.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/users.entity';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateStatusDto } from './dto/update-candidate.dto';
@Controller('candidates')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CandidatesController {
  constructor(private readonly service: CandidatesService) {}

  @Post()
  @Roles(Role.admin_rh, Role.rh)
  create(@Body() dto: CreateCandidateDto, @Req() req) {
    return this.service.create(dto, req.user.organisation.id);
  }

  @Get()
  @Roles(Role.admin_rh, Role.rh, Role.manager)
  findAll(@Req() req) {
    return this.service.findAll(req.user.organisation.id);
  }

  @Patch(':id/status')
  @Roles(Role.admin_rh, Role.rh, Role.manager)
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateStatusDto,
    @Req() req,
  ) {
    return this.service.changeStatus(id, dto.status, req.user);
  }
}
