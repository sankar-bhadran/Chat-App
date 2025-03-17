import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001', // Adjust if your frontend runs elsewhere
    credentials: true,
  }); // Enable CORS
  await app.listen(3000);
  console.log('🚀 Server running at http://localhost:3000/graphql');
}
bootstrap();
