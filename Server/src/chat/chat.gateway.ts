// import {
//   WebSocketGateway,
//   SubscribeMessage,
//   MessageBody,
//   WebSocketServer,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { CreateMessageInput } from 'src/messages/dto/message';
// import { MessageService } from '../message/message.service';
// @WebSocketGateway({
//   cors: {
//     origin: 'http://localhost:3001', // Adjust as per your frontend URL
//   },
// })
// export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer()
//   server: Server;

//   private onlineUsers = new Map<string, string>(); // userId -> socketId mapping

//   handleConnection(client: Socket) {
//     const userId = (client.handshake.query.userId as string) ?? ''; // Get userId from client query

//     if (userId) {
//       this.onlineUsers.set(userId, client.id);
//       console.log(`User connected: ${userId}, Socket ID: ${client.id}`);
//       this.server.emit('onlineUsers', Array.from(this.onlineUsers.keys())); // Broadcast updated user list
//     }
//   }

//   handleDisconnect(client: Socket) {
//     const userId = [...this.onlineUsers.entries()].find(
//       ([_, socketId]) => socketId === client.id,
//     )?.[0];

//     if (userId) {
//       this.onlineUsers.delete(userId);
//       console.log(`User disconnected: ${userId}, Socket ID: ${client.id}`);
//       this.server.emit('onlineUsers', Array.from(this.onlineUsers.keys())); // Broadcast updated user list
//     }
//   }

//   @SubscribeMessage('sendMessage')
//   async handleSendMessage(@MessageBody() data: CreateMessageInput) {
//     console.log('Message received:', data);

//     // Save message in the database
//     const savedMessage = await this.messageService.createMessage(data);

//     // Find receiver socket ID
//     const receiverSocketId = this.onlineUsers.get(data.receiverId);

//     // Emit message to the sender
//     this.server
//       .to(this.onlineUsers.get(data.senderId))
//       .emit('receiveMessage', savedMessage);

//     // Emit message to the receiver (if online)
//     if (receiverSocketId) {
//       this.server.to(receiverSocketId).emit('receiveMessage', savedMessage);
//     }
//   }
// }

import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateMessageInput } from 'src/messages/dto/message';
import { MessageService } from '../messages/message.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3001', // Adjust as per your frontend URL
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly messageService: MessageService) {}

  @WebSocketServer()
  server: Server;

  private onlineUsers = new Map<string, string>(); // userId -> socketId mapping

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;

    if (userId) {
      this.onlineUsers.set(userId, client.id);
      console.log(`User connected: ${userId}, Socket ID: ${client.id}`);
      this.server.emit('onlineUsers', Array.from(this.onlineUsers.keys())); // Broadcast updated user list
    }
  }

  handleDisconnect(client: Socket) {
    const userId = [...this.onlineUsers.entries()].find(
      ([_, socketId]) => socketId === client.id,
    )?.[0];

    if (userId) {
      this.onlineUsers.delete(userId);
      console.log(`User disconnected: ${userId}, Socket ID: ${client.id}`);
      this.server.emit('onlineUsers', Array.from(this.onlineUsers.keys())); // Broadcast updated user list
    }
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(@MessageBody() data: CreateMessageInput) {
    console.log('Message received:', data);

    // Save message in the database
    const savedMessage = await this.messageService.createMessage(data);

    // Find sender and receiver socket IDs
    const senderSocketId = this.onlineUsers.get(data.senderId);
    const receiverSocketId = this.onlineUsers.get(data.receiverId);

    // Emit message to the sender (if online)
    if (senderSocketId) {
      this.server.to(senderSocketId).emit('receiveMessage', savedMessage);
    }

    // Emit message to the receiver (if online)
    if (receiverSocketId) {
      this.server.to(receiverSocketId).emit('receiveMessage', savedMessage);
    }
  }
}
