import { Notification } from '../entity/notification';

export default abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<void>;
}
