import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schemas/message.schema';
import { CreateMessageInput } from './dto/message';
import { Types } from 'mongoose';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async createMessage(
    createMessageInput: CreateMessageInput,
  ): Promise<Message> {
    const newMessage = new this.messageModel({
      ...createMessageInput,
      senderId: new Types.ObjectId(createMessageInput.senderId),
      receiverId: new Types.ObjectId(createMessageInput.receiverId),
    });
    return newMessage.save();
  }
  async getMessagesBetweenUsers(
    userId: string,
    receiverId: string,
  ): Promise<Message[]> {
    return this.messageModel
      .find({
        $or: [
          { senderId: userId, receiverId: receiverId },
          { senderId: receiverId, receiverId: userId },
        ],
      })
      .populate('senderId receiverId')
      .sort({ createdAt: 1 }); // Sort messages from oldest to newest
  }
}
