import { Injectable } from '@nestjs/common';
import Notification from '@core/entity/notification';

import { PrismaService } from './../prisma.service';
import NotificationsRepository from '@core/repository/notification.repository';
import { PrismaNotificationMapper } from './mappers/prisma-notification.mapper';

@Injectable()
export default class PrismaNotificationRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: { recipientId },
    });
    return count;
  }
  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: { recipientId },
    });
    return notifications.map(PrismaNotificationMapper.toDomain);
  }
  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });
    if (!notification) return null;
    return PrismaNotificationMapper.toDomain(notification);
  }
  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prisma.notification.update({
      where: { id: raw.id },
      data: raw,
    });
  }
  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prisma.notification.create({ data: raw });
  }
}
