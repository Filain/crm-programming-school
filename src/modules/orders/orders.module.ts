import { Module } from '@nestjs/common';

import { OrderRepository } from '../repository/services/order.repository';
import { OrdersController } from './orders.controller';
import { OrdersService } from './services/orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository],
})
export class OrdersModule {}
