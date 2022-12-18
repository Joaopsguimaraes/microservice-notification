import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import SendNotification from '@core/use-cases/send-notification';
import { CreateNotificationBody } from '../dto/create-notification-body';
import { NotificationViewModule } from '../view-modules/notification-view.module';
import CancelNotification from '@core/use-cases/cancel-notification';
import ReadNotification from '@core/use-cases/read-notification';
import UnreadNotification from '@core/use-cases/unread-notification';
import CountRecipientNotifications from '@core/use-cases/count-recipientn-notifications';
import GetRecipientNotifications from '@core/use-cases/get-recipient-notifications';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') id: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId: id,
    });
    return {
      count,
    };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') id: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId: id,
    });
    return {
      notifications: notifications.map(NotificationViewModule.toHttp),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { category, content, recipientId } = body;
    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });
    return {
      notification: NotificationViewModule.toHttp(notification),
    };
  }
}
