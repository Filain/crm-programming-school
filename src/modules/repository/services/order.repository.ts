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
    // // Додати умову для фільтрації за певними полями, якщо вони вказані в запиті
    // if (query.customerId) {
    //   qb.andWhere('orders.customerId = :customerId', { customerId: query.customerId });
    // }
    // if (query.status) {
    //   qb.andWhere('orders.status = :status', { status: query.status });
    // }

    // Сортування
    if (query.sortBy.startsWith('-')) {
      query.sortBy = query.sortBy.substring(1);
      qb.addOrderBy(query.sortBy, 'DESC');
    } else {
      qb.addOrderBy(query.sortBy, 'ASC');
    }

    qb.take(orderOnPage);
    qb.skip(query.page * orderOnPage - orderOnPage);
    const pages = (await qb.getCount()) / orderOnPage;
    return [await qb.getMany(), pages];
  }
}
