import { Controller, Get } from '@nestjs/common';

@Controller()
export class PlantInfoController {
  constructor() {}

  @Get('plants-info')
  async test(): Promise<string> {
    return 'Hello World!';
  }
}
