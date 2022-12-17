import { NotificationNotFound } from './errors/notification-not-found';
import Notification from '@core/entity/notification';
import InMemoryNotificationRepository from '../../test/repositories/in-memory-notifications.repository';
import { randomUUID } from 'node:crypto';
import UnreadNotification from './unread-notification';
import ReadNotification from './read-notification';

describe('Unread notification unit test', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);
    const readNotification = new ReadNotification(notificationsRepository);
    const notification = Notification.send('recipient 1', 'Content', 'Category');
    await notificationsRepository.create(notification);
    await readNotification.execute({
      notificationId: notification.id,
    });
    await unreadNotification.execute({
      notificationId: notification.id,
    });
    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });
  it('should not be able to unread a notification when it does not exists', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);
    expect(async () => {
      await unreadNotification.execute({ notificationId: randomUUID() });
    }).rejects.toThrow(NotificationNotFound);
  });
});
