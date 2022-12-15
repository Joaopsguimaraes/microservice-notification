import Notification from 'src/core/entity/notification';
import NotificationRepository from 'src/core/repository/notification.repository';

export default class InMemoryNotificationRepository
  implements NotificationRepository
{
  public notifications: Notification[] = [];

  async create(notification: Notification): Promise<void> {
    await this.notifications.push(notification);
  }
}
