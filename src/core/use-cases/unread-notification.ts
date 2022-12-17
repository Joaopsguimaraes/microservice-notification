import { NotificationNotFound } from './errors/notification-not-found';
import { Injectable } from '@nestjs/common';
import NotificationRepository from '../repository/notification.repository';

interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export default class UnreadNotification {
  constructor(private notificationsRepository: NotificationRepository) {}
  async execute(request: UnreadNotificationRequest): Promise<UnreadNotificationResponse> {
    const { notificationId } = request;
    const notification = await this.notificationsRepository.findById(notificationId);
    if (!notification) {
      throw new NotificationNotFound();
    }
    notification.unread();
    await this.notificationsRepository.save(notification);
  }
}
