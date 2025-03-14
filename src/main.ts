import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AppLogger } from './common/logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new AppLogger();
  app.useLogger(logger);

  const config = new DocumentBuilder()
    .setTitle('DineFlex Backend API')
    .setDescription('API documentation for managing tasks')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
