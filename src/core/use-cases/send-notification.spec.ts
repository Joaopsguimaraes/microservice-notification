import { SendNotification } from './send-notification';
import { randomUUID } from 'node:crypto';
import { Notification } from '../entity/notification';

const notifications: Notification[] = [];

const notificationRepsitory = {
  async create(notification: Notification): Promise<void> {
    await notifications.push(notification);
  },
};

describe('Send notification unit test', () => {
  it('should be able to send a notification', async () => {
    const sendNotification = new SendNotification(notificationRepsitory);
    const { notification } = await sendNotification.execute({
      recipientId: randomUUID(),
      content: 'This is one notification',
      category: 'social',
    });

    expect(notification).toBeTruthy();
  });
});
