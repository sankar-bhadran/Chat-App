import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetAllUsersResponse {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;
}
