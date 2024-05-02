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
    const orderOnPage = 25;
    if (query.sortBy.startsWith('-')) {
      query.sortBy.substring(1);
      qb.addOrderBy(query.sortBy, 'ASC');
    } else {
      qb.addOrderBy(query.sortBy, 'DESC');
    }
    qb.take(query.page * orderOnPage);
    qb.skip(query.page * orderOnPage - orderOnPage);
    const pages = (await qb.getCount()) / orderOnPage;
    return [await qb.getMany(), pages];
  }
}
