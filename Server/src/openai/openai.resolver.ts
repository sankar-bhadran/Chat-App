import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GeminiService } from './openai.service';

@Resolver()
export class OpenAiResolver {
  constructor(private readonly GeminiService: GeminiService) {}

  @Mutation(() => String, { name: 'summarizeText' }) // 👈 Explicitly set the GraphQL name
  async summarizeText(
    @Args('text', { type: () => String }) text: string,
  ): Promise<string> {
    return this.GeminiService.summarizeText(text);
  }

  @Mutation(() => String, { name: 'correctGrammar' }) // 👈 Explicitly set the GraphQL name
  async correctGrammar(
    @Args('text', { type: () => String }) text: string,
  ): Promise<string> {
    return this.GeminiService.correctGrammar(text);
  }
}
