import { CreateNotificationBody } from './create-notification-body';
import { PrismaService } from './prisma.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaPromise } from '@prisma/client';

@Controller('notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list() {
    return this.prisma.notification.findMany();
  }
  @Post()
  async create(@Body() body: CreateNotificationBody): Promise<void> {
    const { category, content, recipientId } = body;
    await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        content,
        category,
        recipientId,
      },
    });
  }
}
