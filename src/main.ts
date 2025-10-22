import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initApp } from './init';
import { LoggerModule } from './logger/logger.module';

async function bootstrap() {
  let app = await NestFactory.create(AppModule, {
    logger: LoggerModule.createLogger(),
  });
  app = initApp(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
