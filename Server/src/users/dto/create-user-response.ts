import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CreateUserResponse {
  @Field(() => Number)
  status: number;

  @Field()
  message: string;
}
