import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GrammarInput {
  @Field()
  text: string;
}
