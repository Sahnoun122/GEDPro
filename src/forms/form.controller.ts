import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { FormsService } from './form.service';
import { CreateFormDto } from './fields/dto/create-form.dto';
import { CreateFieldDto } from './fields/dto/create-field.dto';


@Controller('forms')
export class FormsController {
  constructor(private readonly service: FormsService) {}

  @Post()
  createForm(@Body() dto: CreateFormDto) {
    return this.service.createForm(dto);
  }

  @Post(':id/fields')
  addField(@Param('id') formId: string, @Body() dto: CreateFieldDto) {
    return this.service.addField(formId, dto);
  }

  @Get(':id')
  getForm(@Param('id') id: string) {
    return this.service.getFormWithFields(id);
  }
}
