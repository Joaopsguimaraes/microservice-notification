import { randomUUID } from 'node:crypto';

import InMemoryNotificationRepository from '../..//test/repositories/in-memory-notifications.repository';
import SendNotification from './send-notification';

describe('Send notification unit test', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const sendNotification = new SendNotification(notificationsRepository);
    const { notification } = await sendNotification.execute({
      recipientId: randomUUID(),
      content: 'This is one notification',
      category: 'social',
    });

    expect(notification).toBeTruthy();
    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
    expect(notificationsRepository.notifications).toContainEqual(notification);
  });
});
