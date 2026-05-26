import { Controller, Get, Post, Body } from '@nestjs/common';
import { AlertsService } from './alerts.service';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Get()
  async findAll() {
    return this.alertsService.findAll();
  }

  @Post()
  async create(
    @Body()
    body: {
      description: string;
      latitude: number;
      longitude: number;
      photo?: string;
      type: string;
    },
  ) {
    return this.alertsService.create(body);
  }
}
