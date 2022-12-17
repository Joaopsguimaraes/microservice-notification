import { Injectable } from '@nestjs/common';
import Notification from '@core/entity/notification';

import { PrismaService } from './../prisma.service';
import NotificationsRepository from '@core/repository/notification.repository';
import { PrismaNotificationMapper } from './mappers/prisma-notification.mapper';

@Injectable()
export default class PrismaNotificationRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}
  async findById(notificationId: string): Promise<Notification | null> {
    throw new Error('Method not implemented.');
  }
  async save(notification: Notification): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prismaService.notification.create({
      data: raw,
    });
  }
}
