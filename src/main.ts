import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from 'modules/app';
import {
  JwtExceptionFilter,
  MongoExceptionFilter,
  MongooseExceptionFilter,
} from 'filters';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new MongoExceptionFilter(),
    new MongooseExceptionFilter(),
    new JwtExceptionFilter(),
  );
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
