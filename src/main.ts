import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ProductSlugAlreadyExistsErrorFilter } from './products/filters/product-slug-already-exists.filter.js';
import { ValidationPipe } from '@nestjs/common';
import { NotFoundErrorFilter } from './common/filters/not-found-error.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  app.useGlobalFilters(new ProductSlugAlreadyExistsErrorFilter(), new NotFoundErrorFilter); //tratamento de erros centralizados (puxa todos os erros para ele)

  app.useGlobalPipes(new ValidationPipe({ //captura os erros definidos no create-product
    errorHttpStatusCode: 422,
  }))

  // 400 - Bad request -> não entendi o que foi enviado
  // 422 - Unprocessable Entity -> Eu consegui entender o que foi enviado mas o valor passado nao esta certo

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
