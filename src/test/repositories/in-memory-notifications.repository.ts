import Notification from 'src/core/entity/notification';
import NotificationRepository from 'src/core/repository/notification.repository';

export default class InMemoryNotificationRepository implements NotificationRepository {
  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter((item) => item.recipientId === recipientId);
  }
  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter((item) => item.recipientId === recipientId).length;
  }
  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find((item) => item.id === notificationId);
    if (!notification) {
      return null;
    }
    return notification;
  }
  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex((item) => item.id === notification.id);
    if (notificationIndex <= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }
  public notifications: Notification[] = [];

  async create(notification: Notification): Promise<void> {
    await this.notifications.push(notification);
  }
}
