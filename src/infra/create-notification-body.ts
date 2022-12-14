import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateNotificationBody {
  @IsUUID()
  @IsNotEmpty()
  recipientId: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 240)
  content: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}
