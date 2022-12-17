import NotificationRepository from '@core/repository/notification.repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import PrismaNotificationRepository from './prisma/repositories/prisma-notifications.repository';

@Module({
  providers: [PrismaService, { provide: NotificationRepository, useClass: PrismaNotificationRepository }],
  exports: [NotificationRepository],
})
export class DatabaseModule {}
