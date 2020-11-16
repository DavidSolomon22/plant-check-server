import { NestFactory } from '@nestjs/core';
import { AppModule } from 'modules/app';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(
  //   new MongoExceptionFilter(),
  //   new MongooseExceptionFilter(),
  //   new JwtExceptionFilter(),
  // );
  // const configService = app.get(ConfigService);
  // const port = configService.get<number>('PORT');
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
