import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ProductSlugAlreadyExistsErrorFilter } from './products/filters/product-slug-already-exists.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  app.useGlobalFilters(new ProductSlugAlreadyExistsErrorFilter());
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
