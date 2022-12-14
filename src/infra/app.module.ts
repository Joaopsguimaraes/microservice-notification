import { PrismaService } from './prisma.service';
import { AppController } from '../app.controller';
import { HttpModule } from './http.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
