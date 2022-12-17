import { NotificationNotFound } from './errors/notification-not-found';
import { Injectable } from '@nestjs/common';
import NotificationRepository from '../repository/notification.repository';

interface ReadNotificationRequest {
  notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export default class ReadNotification {
  constructor(private notificationsRepository: NotificationRepository) {}
  async execute(request: ReadNotificationRequest): Promise<ReadNotificationResponse> {
    const { notificationId } = request;
    const notification = await this.notificationsRepository.findById(notificationId);
    if (!notification) {
      throw new NotificationNotFound();
    }
    notification.read();
    await this.notificationsRepository.save(notification);
  }
}
