import { Injectable } from '@nestjs/common';
import Notification from '../entity/notification';
import NotificationRepository from '../repository/notification.repository';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}
@Injectable()
export default class SendNotification {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute(request: SendNotificationRequest): Promise<SendNotificationResponse> {
    const { category, content, recipientId } = request;
    const notification = Notification.send(recipientId, content, category);
    await this.notificationsRepository.create(notification);
    return { notification };
  }
}
