import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { CandidatesService } from './candidate.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/users.entity';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateStatusDto } from './dto/update-candidate.dto';
import type { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';

@Controller('candidates')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CandidatesController {
  constructor(private readonly service: CandidatesService) {}

  @Post()
  @Roles(Role.admin_rh, Role.rh)
  create(@Body() dto: CreateCandidateDto, @Req() req: RequestWithUser) {
    if (!req.user) {
      throw new BadRequestException('Utilisateur non trouvé dans la requête');
    }
    
    const organisationId = req.user.organisation?.id || (req.user as any).organisation_id;
    
    if (!organisationId) {
      throw new BadRequestException('ID de l\'organisation manquant');
    }
    
    return this.service.create(dto, organisationId);
  }

  @Get()
  @Roles(Role.admin_rh, Role.rh, Role.manager)
  findAll(@Req() req: RequestWithUser) {
    if (!req.user) {
      throw new BadRequestException('Utilisateur non trouvé dans la requête');
    }
    
    // Utiliser organisation_id du payload JWT si organisation n'est pas chargée
    const organisationId = req.user.organisation?.id || (req.user as any).organisation_id;
    
    if (!organisationId) {
      throw new BadRequestException('ID de l\'organisation manquant');
    }
    
    return this.service.findAll(organisationId);
  }

  @Patch(':id/status')
  @Roles(Role.admin_rh, Role.rh, Role.manager)
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateStatusDto,
    @Req() req: RequestWithUser,
  ) {
    return this.service.changeStatus(
      id,
      dto.status,
      req.user.role, 
    );
  }
}
