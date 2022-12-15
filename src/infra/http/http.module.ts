import { NotificationsController } from './dto/notifications.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [NotificationsController],
})
export class HttpModule {}
