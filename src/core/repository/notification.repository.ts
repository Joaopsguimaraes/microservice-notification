import Notification from '../entity/notification';

export default abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>;
}
