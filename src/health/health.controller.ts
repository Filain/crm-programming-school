import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Health')
@Controller()
export class HealthController {
  @Get()
  getHello(): string {
    return 'health';
  }
}
