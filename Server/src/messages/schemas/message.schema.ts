import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Message extends Document {
  @Field(() => ID)
  declare _id: Types.ObjectId;

  @Field(() => ID) // ✅ Use ID (GraphQL understands it as a String)
  @Prop({ type: String, required: true }) // ✅ Store ID as String
  senderId: string;

  @Field(() => ID) // ✅ Same for receiverId
  @Prop({ type: String, required: true })
  receiverId: string;

  @Field({ nullable: true })
  @Prop()
  text?: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
