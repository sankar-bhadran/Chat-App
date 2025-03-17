import { Module } from '@nestjs/common';
import { GeminiService } from './openai.service';
import { OpenAiResolver } from './openai.resolver';

@Module({
  providers: [GeminiService, OpenAiResolver], // Register the service
  exports: [GeminiService], // Export the service for use in other modules
})
export class OpenAIModule {}
