import { Controller, Post, Body, Param } from '@nestjs/common';
import { FieldService } from './field.service';
import { CreateFieldDto } from './dto/create-field.dto';

@Controller('forms/:formId/fields')
export class FieldController {
  constructor(private readonly service: FieldService) {}

  @Post()
  create(@Param('formId') formId: string, @Body() dto: CreateFieldDto) {
    return this.service.create(formId, dto);
  }
}
