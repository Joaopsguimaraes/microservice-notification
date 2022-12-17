import { NotificationNotFound } from './errors/notification-not-found';
import Notification from '@core/entity/notification';
import InMemoryNotificationRepository from '../../test/repositories/in-memory-notifications.repository';
import CancelNotification from './cancel-notification';
import { randomUUID } from 'node:crypto';
import ReadNotification from './read-notification';

describe('Read notification unit test', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationsRepository);
    const notification = Notification.send('recipient 1', 'Content', 'Category');
    await notificationsRepository.create(notification);
    await readNotification.execute({
      notificationId: notification.id,
    });
    expect(notificationsRepository.notifications[0].readAt).toEqual(expect.any(Date));
  });
  it('should not be able to read a notification when it does not exists', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationsRepository);
    expect(async () => {
      await readNotification.execute({ notificationId: randomUUID() });
    }).rejects.toThrow(NotificationNotFound);
  });
});
