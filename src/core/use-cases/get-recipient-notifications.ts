import { Injectable } from '@nestjs/common';
import NotificationRepository from '../repository/notification.repository';
import Notification from '@core/entity/notification';

interface GetRecipientNotificationsRequest {
  recipientId: string;
}

interface GetRecipientNotificationsResponse {
  notifications: Notification[];
}

@Injectable()
export default class GetRecipientNotifications {
  constructor(private notificationsRepository: NotificationRepository) {}
  async execute(request: GetRecipientNotificationsRequest): Promise<GetRecipientNotificationsResponse> {
    const { recipientId } = request;
    const notifications = await this.notificationsRepository.findManyByRecipientId(recipientId);
    return { notifications };
  }
}
