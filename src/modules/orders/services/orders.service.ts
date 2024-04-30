import { Injectable } from '@nestjs/common';

import { OrderRepository } from '../../repository/services/order.repository';
import { OrderListRequestDto } from '../dto/request/order-list.request.dto';
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
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} order`;
  // }
  //
  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
