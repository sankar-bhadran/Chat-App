import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from './user.model';

@ObjectType()
export class LoginResponse {
  @Field()
  status: boolean;

  @Field()
  message: string;

  @Field(() => UserModel, { nullable: true })
  user?: UserModel;
}
