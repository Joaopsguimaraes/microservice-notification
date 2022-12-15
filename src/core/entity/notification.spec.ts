import { randomUUID } from 'node:crypto';
import Notification from './notification';

describe('Unit test notification', () => {
  it('should be able to create a notification content', () => {
    const expectedRecipientId: string = randomUUID();
    const expectedContent = 'Voce tem uma nova solicitacao';
    const expectedCategory = 'social';

    const content = Notification.New(
      expectedRecipientId,
      expectedContent,
      expectedCategory,
    );

    expect(content).toBeTruthy();
  });
});
