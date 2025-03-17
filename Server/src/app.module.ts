import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { MessageModule } from './messages/messages.module';
import * as dotenv from 'dotenv';
import { ChatModule } from './chat/chat.module';
import { OpenAIModule } from './openai/openai.module';
// import { ObjectIdScalar } from './object-id.scalar';

// Load environment variables from .env file
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase',
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      path: '/graphql',
    }),
    UsersModule,
    MessageModule,
    ChatModule,
    OpenAIModule,
  ],
  // providers: [ObjectIdScalar],
})
export class AppModule {}
