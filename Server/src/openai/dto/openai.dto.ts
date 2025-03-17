import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SummarizeInput {
  @Field()
  text: string;
}
