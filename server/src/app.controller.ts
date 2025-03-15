import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Welcome message' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns a welcome message',
    schema: {
      type: 'string',
      example: 'Welcome to Luxurious API!'
    }
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
