import Notification from '@core/entity/notification';
import InMemoryNotificationRepository from '../../test/repositories/in-memory-notifications.repository';
import { randomUUID } from 'node:crypto';
import CountRecipientNotifications from './count-recipientn-notifications';

describe('Count recipient notification use case test', () => {
  it('should be able to count notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotifications = new CountRecipientNotifications(notificationRepository);
    const firstNotification = Notification.send('recipient 1', randomUUID(), randomUUID());
    await notificationRepository.create(firstNotification);
    const secondNotification = Notification.send('recipient 1', randomUUID(), randomUUID());
    await notificationRepository.create(secondNotification);
    const thirdNotification = Notification.send('recipient 2', randomUUID(), randomUUID());
    await notificationRepository.create(thirdNotification);
    const { count } = await countRecipientNotifications.execute({ recipientId: 'recipient 1' });
    expect(count).toBe(2);
  });
});
