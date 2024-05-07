import { Injectable } from '@nestjs/common';

import { OrderRepository } from '../../repository/services/order.repository';
import { OrderListRequestDto } from '../dto/request/order-list.request.dto';
import { OrderResponseDto } from '../dto/response/order.response.dto';
import { OrdersListResponseDto } from '../dto/response/orders-list.response.dto';
import { OrdersMapper } from './orders.mapper';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrderRepository) {}

  public async getList(
    query: OrderListRequestDto,
  ): Promise<OrdersListResponseDto> {
    const [entities, total] = await this.ordersRepository.getList(query);
    return OrdersMapper.toListResponseDto(entities, total, query);
  }

  public async findOne(id: string): Promise<OrderResponseDto> {
    const orderId = parseInt(id);
    return OrdersMapper.toResponseDto(
      await this.ordersRepository.findOneBy({ id: orderId }),
    );
  }

  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
