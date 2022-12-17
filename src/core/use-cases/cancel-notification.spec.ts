import { NotificationNotFound } from './errors/notification-not-found';
import Notification from '@core/entity/notification';
import InMemoryNotificationRepository from '../../test/repositories/in-memory-notifications.repository';
import CancelNotification from './cancel-notification';
import { randomUUID } from 'node:crypto';

describe('Cancel notification unit test', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const notification = Notification.send(randomUUID(), 'Content', 'Category');
    await notificationsRepository.create(notification);
    const cancelNotification = new CancelNotification(notificationsRepository);
    await cancelNotification.execute({
      notificationId: notification.id,
    });
    expect(notificationsRepository.notifications[0].canceledAt).toEqual(expect.any(Date));
  });
  it('should not be able to cancel a notification when it does not exists', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);
    expect(async () => {
      await cancelNotification.execute({ notificationId: randomUUID() });
    }).rejects.toThrow(NotificationNotFound);
  });
});
