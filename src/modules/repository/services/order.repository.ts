import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { OrderEntity } from '../../../database/entities/order.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { OrderFilterRequestDto } from '../../orders/dto/request/order-filter.request.dto';
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
    const totalCount = await qb.getCount();
    const pages = Math.ceil(totalCount / orderOnPage);
    return [await qb.getMany(), pages];
  }

  public async findOrderBy(id: number): Promise<OrderEntity> {
    const qb = this.createQueryBuilder('orders');
    qb.andWhere('orders.id = :id', { id });
    qb.leftJoinAndSelect('orders.comments', 'comments');
    return await qb.getOne();
  }
  public async getFilteredList(
    query: OrderFilterRequestDto,
  ): Promise<[OrderEntity[], number]> {
    const qb = this.createQueryBuilder('orders');
    const orderOnPage = 25;

    // Фільтрації
    if (query.name) {
      qb.andWhere('orders.name LIKE :name', { name: `%${query.name}%` });
    }
    if (query.surname) {
      qb.andWhere('orders.surname LIKE :surname', {
        surname: `%${query.surname}%`,
      });
    }
    if (query.email) {
      qb.andWhere('orders.email LIKE :email', { email: `%${query.email}%` });
    }
    if (query.phone) {
      qb.andWhere('orders.phone LIKE :phone', { phone: `%${query.phone}%` });
    }
    if (query.age) {
      qb.andWhere('orders.age = :age', { age: query.age });
    }
    if (query.course_format) {
      qb.andWhere('orders.course_format = :course_format', {
        course_format: query.course_format,
      });
    }
    if (query.course_type) {
      qb.andWhere('orders.course_type = :course_type', {
        course_type: query.course_type,
      });
    }
    if (query.alreadyPaid) {
      qb.andWhere('orders.alreadyPaid = :alreadyPaid', {
        alreadyPaid: query.alreadyPaid,
      });
    }
    if (query.created_at) {
      qb.andWhere('orders.created_at = :name', {
        created_at: query.created_at,
      });
    }
    if (query.status) {
      qb.andWhere('orders.status = :status', { status: query.status });
    }
    if (query.group) {
      qb.andWhere('orders.group = :group', { group: query.group });
    }

    // Сортування
    if (query.sortBy.startsWith('-')) {
      query.sortBy = query.sortBy.substring(1);
      qb.addOrderBy(query.sortBy, 'DESC');
    } else {
      qb.addOrderBy(query.sortBy, 'ASC');
    }

    qb.take(orderOnPage);
    qb.skip(query.page * orderOnPage - orderOnPage);
    const totalCount = await qb.getCount();
    const pages = Math.ceil(totalCount / orderOnPage);
    return [await qb.getMany(), pages];
  }

  public async getMyFilteredList(
    query: OrderFilterRequestDto,
    managerName: string,
  ): Promise<[OrderEntity[], number]> {
    const qb = this.createQueryBuilder('orders');
    const orderOnPage = 25;

    qb.andWhere('orders.manager = :manager', { manager: managerName });

    // Фільтрації
    if (query.name) {
      qb.andWhere('orders.name LIKE :name', { name: `%${query.name}%` });
    }
    if (query.surname) {
      qb.andWhere('orders.surname LIKE :surname', {
        surname: `%${query.surname}%`,
      });
    }
    if (query.email) {
      qb.andWhere('orders.email LIKE :email', { email: `%${query.email}%` });
    }
    if (query.phone) {
      qb.andWhere('orders.phone LIKE :phone', { phone: `%${query.phone}%` });
    }
    if (query.age) {
      qb.andWhere('orders.age = :age', { age: query.age });
    }
    if (query.course_format) {
      qb.andWhere('orders.course_format = :course_format', {
        course_format: query.course_format,
      });
    }
    if (query.course_type) {
      qb.andWhere('orders.course_type = :course_type', {
        course_type: query.course_type,
      });
    }
    if (query.alreadyPaid) {
      qb.andWhere('orders.alreadyPaid = :alreadyPaid', {
        alreadyPaid: query.alreadyPaid,
      });
    }
    if (query.created_at) {
      qb.andWhere('orders.created_at = :name', {
        created_at: query.created_at,
      });
    }
    if (query.status) {
      qb.andWhere('orders.status = :status', { status: query.status });
    }
    if (query.group) {
      qb.andWhere('orders.group = :group', { group: query.group });
    }

    // Сортування
    if (query.sortBy.startsWith('-')) {
      query.sortBy = query.sortBy.substring(1);
      qb.addOrderBy(query.sortBy, 'DESC');
    } else {
      qb.addOrderBy(query.sortBy, 'ASC');
    }

    qb.take(orderOnPage);
    qb.skip(query.page * orderOnPage - orderOnPage);
    const totalCount = await qb.getCount();
    const pages = Math.ceil(totalCount / orderOnPage);
    return [await qb.getMany(), pages];
  }
}
