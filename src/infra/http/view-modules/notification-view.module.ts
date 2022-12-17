import Notification from '@core/entity/notification';

export class NotificationViewModule {
  static toHttp(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      content: notification.content,
      category: notification.category,
    };
  }
}
