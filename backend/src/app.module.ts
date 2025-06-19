import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Product, Order } from './entities';
import { ProductsController } from './controllers/products.controller';
import { OrdersController } from './controllers/orders.controller';
import { ProductsService } from './services/products.service';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Product, Order],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product, Order]),
  ],
  controllers: [AppController, ProductsController, OrdersController],
  providers: [AppService, ProductsService, OrdersService],
})
export class AppModule {}

