import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AlertsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.alert.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(data: {
    description: string;
    latitude: number;
    longitude: number;
    photo?: string;
    type: string;
  }) {
    return this.prisma.alert.create({
      data: {
        description: data.description,
        latitude: Number(data.latitude),
        longitude: Number(data.longitude),
        photo: data.photo,
        type: data.type,
      },
    });
  }
}
