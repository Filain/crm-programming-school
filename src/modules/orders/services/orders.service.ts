import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { IUserData } from '../../auth/interfaces/user-data.interface';
import { OrderRepository } from '../../repository/services/order.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { OrderFilterRequestDto } from '../dto/request/order-filter.request.dto';
import { OrderListRequestDto } from '../dto/request/order-list.request.dto';
import { OrderUpdateRequestDto } from '../dto/request/order-update.request.dto';
import { OrderResponseDto } from '../dto/response/order.response.dto';
import { OrdersResponseDto } from '../dto/response/orders.response.dto';
import { OrdersListResponseDto } from '../dto/response/orders-list.response.dto';
import { OrdersMapper } from './orders.mapper';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrderRepository,
    private userRepository: UserRepository,
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

  public async update(
    order_id: number,
    updateOrderDto: OrderUpdateRequestDto,
    userData: IUserData,
  ): Promise<OrdersResponseDto> {
    const orderEntity = await this.ordersRepository.findOneBy({ id: order_id });
    if (!orderEntity) {
      throw new UnprocessableEntityException('Order not found');
    }
    const userEntity = await this.userRepository.findOneBy({
      id: userData.userId,
    });
    if (!userEntity) {
      throw new UnprocessableEntityException('User not found');
    }
    if (
      orderEntity.manager != null &&
      userEntity.name !== orderEntity.manager
    ) {
      throw new UnprocessableEntityException('You are not manager');
    }

    const order = await this.ordersRepository.save(
      this.ordersRepository.create({
        ...orderEntity,
        ...updateOrderDto,
        manager: userEntity.name,
        created_at: new Date(),
      }),
    );
    return OrdersMapper.toResponseDto(order);
  }
  public async findAllFiltered(
    query: OrderFilterRequestDto,
  ): Promise<OrdersListResponseDto> {
    const [entities, total] =
      await this.ordersRepository.getFilteredList(query);
    return OrdersMapper.toListResponseDto(entities, total, query);
  }
  public async findMylFiltered(
    query: OrderFilterRequestDto,
    userData: IUserData,
  ): Promise<OrdersListResponseDto> {
    const userEntity = await this.userRepository.findOneBy({
      id: userData.userId,
    });
    const [entities, total] = await this.ordersRepository.getMyFilteredList(
      query,
      userEntity.name,
    );
    return OrdersMapper.toListResponseDto(entities, total, query);
  }
}
