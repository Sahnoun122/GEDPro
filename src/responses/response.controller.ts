import { Controller, Post, Param, Body } from '@nestjs/common';
import { ResponseService } from './response.service';

@Controller('responses')
export class ResponseController {
  constructor(private readonly service: ResponseService) {}

  @Post(':formId')
  submit(@Param('formId') formId: string, @Body() answers: any) {
    return this.service.submit(formId, answers);
  }
}
