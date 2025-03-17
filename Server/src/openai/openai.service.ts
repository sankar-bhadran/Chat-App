// import { Injectable } from '@nestjs/common';
// import OpenAI from 'openai'; // Correct import for OpenAI v4+
// import * as dotenv from 'dotenv';

// dotenv.config();

// @Injectable()
// export class OpenAiService {
//   private openai: OpenAI;

//   constructor() {
//     this.openai = new OpenAI({
//       apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in your .env file
//     });
//   }

//   async summarizeText(text: string): Promise<string> {
//     try {
//       const response = await this.openai.chat.completions.create({
//         model: 'gpt-4', // Use 'gpt-3.5-turbo' if needed
//         messages: [{ role: 'user', content: `Summarize this: ${text}` }],
//       });

//       return response.choices[0]?.message?.content || 'No summary available.';
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         console.error('OpenAI API Error:', error.message);
//         throw new Error('Failed to summarize text: ' + error.message);
//       } else {
//         console.error('Unexpected error:', error);
//         throw new Error('Failed to summarize text.');
//       }
//     }
//   }
// }

import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class GeminiService {
  private gemini: GoogleGenerativeAI;

  constructor() {
    this.gemini = new GoogleGenerativeAI(
      process.env.GOOGLE_GEMINI_API_KEY || '',
    );
  }

  async summarizeText(text: string): Promise<string> {
    try {
      const model = this.gemini.getGenerativeModel({
        model: 'gemini-2.0-flash',
      });

      const response = await model.generateContent(`Summarize this: ${text}`);
      const summary = response.response.text();

      return summary || 'No summary available.';
    } catch (error) {
      console.error('Google Gemini API Error:', error);
      throw new Error('Failed to summarize text.');
    }
  }

  async correctGrammar(text: string): Promise<string> {
    try {
      const model = this.gemini.getGenerativeModel({
        model: 'gemini-2.0-flash',
      });
      const response = await model.generateContent(
        `Correct any grammar and spelling mistakes in this sentence and return only the corrected sentence without any extra text: ${text}`,
      );
      const correctedGrammar = response.response.text();
      return correctedGrammar || '';
    } catch (error) {
      console.error('Google Gemini API Error:', error);
      throw new Error('Failed to summarize text.');
    }
  }
}
