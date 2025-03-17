import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './schemas/message.schema';
import { CreateMessageInput } from './dto/message';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Mutation(() => Message)
  async sendMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
  ): Promise<Message> {
    return this.messageService.createMessage(createMessageInput);
  }

  @Query(() => [Message])
  async getMessagesBetweenUsers(
    @Args('userId') userId: string,
    @Args('receiverId') receiverId: string,
  ): Promise<Message[]> {
    return this.messageService.getMessagesBetweenUsers(userId, receiverId);
  }
}
