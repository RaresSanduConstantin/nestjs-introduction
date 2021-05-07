import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { ProductsModule } from './products/products.modules';


@Module({
  imports: [ProductsModule],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule {}
