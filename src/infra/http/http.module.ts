import UnreadNotification from '@core/use-cases/unread-notification';
import { Module } from '@nestjs/common';
import SendNotification from '@core/use-cases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';
import CancelNotification from '@core/use-cases/cancel-notification';
import CountRecipientNotifications from '@core/use-cases/count-recipientn-notifications';
import GetRecipientNotifications from '@core/use-cases/get-recipient-notifications';
import ReadNotification from '@core/use-cases/read-notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
