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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { CandidatesService } from './candidate.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/users.entity';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateStatusDto } from './dto/update-candidate.dto';
import type { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';

@ApiTags('Candidats')
@Controller('candidates')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class CandidatesController {
  constructor(private readonly service: CandidatesService) {}

  @Post()
  @Roles(Role.admin_rh, Role.rh)
  @ApiOperation({ summary: 'Créer un nouveau candidat' })
  @ApiResponse({ status: 201, description: 'Candidat créé avec succès.' })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  @ApiResponse({ status: 401, description: 'Non autorisé.' })
  @ApiResponse({ status: 403, description: 'Accès refusé.' })
  @ApiBody({ type: CreateCandidateDto })
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
  @ApiOperation({ summary: 'Récupérer tous les candidats de l\'organisation' })
  @ApiResponse({ status: 200, description: 'Liste des candidats récupérée avec succès.' })
  @ApiResponse({ status: 401, description: 'Non autorisé.' })
  @ApiResponse({ status: 403, description: 'Accès refusé.' })
  findAll(@Req() req: RequestWithUser) {
    if (!req.user) {
      throw new BadRequestException('Utilisateur non trouvé dans la requête');
    }
    
    const organisationId = req.user.organisation?.id || (req.user as any).organisation_id;
    
    if (!organisationId) {
      throw new BadRequestException('ID de l\'organisation manquant');
    }
    
    return this.service.findAll(organisationId);
  }

  @Patch(':id/status')
  @Roles(Role.admin_rh, Role.rh, Role.manager)
  @ApiOperation({ summary: 'Modifier le statut d\'un candidat' })
  @ApiParam({ name: 'id', description: 'ID du candidat', type: 'string' })
  @ApiResponse({ status: 200, description: 'Statut du candidat modifié avec succès.' })
  @ApiResponse({ status: 404, description: 'Candidat non trouvé.' })
  @ApiResponse({ status: 401, description: 'Non autorisé.' })
  @ApiResponse({ status: 403, description: 'Accès refusé.' })
  @ApiBody({ type: UpdateStatusDto })
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
