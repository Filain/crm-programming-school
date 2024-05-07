import { Injectable } from '@nestjs/common';

import { CommentsRepository } from '../../repository/services/comments.repository';
import { OrderRepository } from '../../repository/services/order.repository';
import { OrderListRequestDto } from '../dto/request/order-list.request.dto';
import { OrderResponseDto } from '../dto/response/order.response.dto';
import { OrdersResponseDto } from '../dto/response/orders.response.dto';
import { OrdersListResponseDto } from '../dto/response/orders-list.response.dto';
import { OrdersMapper } from './orders.mapper';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrderRepository,
    // private readonly commentsRepository: CommentsRepository,
  ) {}

  public async getList(
    query: OrderListRequestDto,
  ): Promise<OrdersListResponseDto> {
    const [entities, total] = await this.ordersRepository.getList(query);
    return OrdersMapper.toListResponseDto(entities, total, query);
  }

  public async findOne(order_id: string): Promise<OrderResponseDto> {
    const orderId = parseInt(order_id);
    const order = await this.ordersRepository.findOrderBy(orderId);
    return OrdersMapper.toOneResponseDto(order);
  }

  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
