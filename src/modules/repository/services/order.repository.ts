import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { OrderEntity } from '../../../database/entities/order.entity';
import { OrderListRequestDto } from '../../orders/dto/request/order-list.request.dto';

@Injectable()
export class OrderRepository extends Repository<OrderEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(OrderEntity, dataSource.manager);
  }

  public async getList(
    query: OrderListRequestDto,
  ): Promise<[OrderEntity[], number]> {
    const qb = this.createQueryBuilder('orders');
    if (query.sortBy.startsWith('-')) {
      query.sortBy.substring(1);
      qb.addOrderBy(query.sortBy, 'ASC');
    } else {
      qb.addOrderBy(query.sortBy, 'DESC');
    }
    qb.take(query.limit);
    qb.skip(query.offset);
    return await qb.getManyAndCount();
  }
}
