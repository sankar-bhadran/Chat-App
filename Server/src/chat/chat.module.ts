import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MessageModule } from 'src/messages/messages.module';

@Module({
  imports: [MessageModule], // Import MessageModule so ChatGateway can use MessageService
  providers: [ChatGateway],
})
export class ChatModule {}
