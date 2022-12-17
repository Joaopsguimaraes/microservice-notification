import { NotificationNotFound } from './errors/notification-not-found';
import { Injectable } from '@nestjs/common';
import NotificationRepository from '../repository/notification.repository';

interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export default class CancelNotification {
  constructor(private notificationsRepository: NotificationRepository) {}
  async execute(request: CancelNotificationRequest): Promise<CancelNotificationResponse> {
    const { notificationId } = request;
    const notification = await this.notificationsRepository.findById(notificationId);
    if (!notification) {
      throw new NotificationNotFound();
    }
    notification.cancel();
    await this.notificationsRepository.save(notification);
  }
}
