import { OrderEntity } from '../../../database/entities/order.entity';
import { CommentsMapper } from '../../comments/services/comments.mapper';
import { OrderListRequestDto } from '../dto/request/order-list.request.dto';
import { OrderResponseDto } from '../dto/response/order.response.dto';
import { OrdersResponseDto } from '../dto/response/orders.response.dto';
import { OrdersListResponseDto } from '../dto/response/orders-list.response.dto';

export class OrdersMapper {
  public static toResponseDto(orderEntity: OrderEntity): OrdersResponseDto {
    return {
      id: orderEntity.id,
      name: orderEntity.name,
      surname: orderEntity.surname,
      email: orderEntity.email,
      phone: orderEntity.phone,
      age: orderEntity.age,
      course: orderEntity.course,
      course_format: orderEntity.course_format,
      course_type: orderEntity.course_type,
      status: orderEntity.status,
      sum: orderEntity.sum,
      alreadyPaid: orderEntity.alreadyPaid,
      created_at: orderEntity.created_at,
      group: orderEntity.group,
      manager: orderEntity.manager,
    };
  }
  public static toListResponseDto(
    entities: OrderEntity[],
    total: number,
    query: OrderListRequestDto,
  ): OrdersListResponseDto {
    return {
      data: entities.map(this.toResponseDto),
      meta: {
        page: query.page,
        total,
      },
    };
  }
  public static toOneResponseDto(orderEntity: OrderEntity): OrderResponseDto {
    return {
      massage: orderEntity.msg,
      utm: orderEntity.utm,
      comments: orderEntity.comments
        ? orderEntity.comments.map(CommentsMapper.toResponseDto)
        : [],
    };
  }
}
