import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { SkipAuth } from '../modules/auth/decorators/skip-auth.decorator';

@SkipAuth()
@ApiTags('Health')
@Controller()
export class HealthController {
  @Get()
  getHello(): string {
    return 'health';
  }
}
