import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMessageInput {
  @Field(() => String) // ✅ Use String
  senderId: string;

  @Field(() => String) // ✅ Use String
  receiverId: string;

  @Field({ nullable: true })
  text?: string;
}
