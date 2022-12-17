import Notification from '@core/entity/notification';
import InMemoryNotificationRepository from '../../test/repositories/in-memory-notifications.repository';
import { randomUUID } from 'node:crypto';
import CountRecipientNotifications from './count-recipientn-notifications';
import GetRecipientNotifications from './get-recipient-notifications';

describe('Get recipient notification use case test', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const getRecipientNotifications = new GetRecipientNotifications(notificationRepository);
    const firstNotification = Notification.send('recipient 1', randomUUID(), randomUUID());
    await notificationRepository.create(firstNotification);
    const secondNotification = Notification.send('recipient 1', randomUUID(), randomUUID());
    await notificationRepository.create(secondNotification);
    const thirdNotification = Notification.send('recipient 2', randomUUID(), randomUUID());
    await notificationRepository.create(thirdNotification);
    const { notifications } = await getRecipientNotifications.execute({ recipientId: 'recipient 1' });
    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient 1' }),
        expect.objectContaining({ recipientId: 'recipient 1' }),
      ]),
    );
  });
});
