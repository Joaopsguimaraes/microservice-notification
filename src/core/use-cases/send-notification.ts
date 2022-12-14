import { Notification } from '../entity/notification';
import NotificationRepository from '../repository/notification.repository';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

export class SendNotification {
  constructor(private notificationsRepository: NotificationRepository) {}
  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { category, content, recipientId } = request;
    const notification = Notification.New(recipientId, content, category);
    await this.notificationsRepository.create(notification);
    return {
      notification,
    };
  }
}
