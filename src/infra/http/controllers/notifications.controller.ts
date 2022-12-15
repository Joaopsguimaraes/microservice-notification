import { Body, Controller, Post } from '@nestjs/common';
import SendNotification from 'src/core/use-cases/send-notification';
import { CreateNotificationBody } from '../dto/create-notification-body';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}
  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { category, content, recipientId } = body;

    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });

    return { notification };
  }
}
