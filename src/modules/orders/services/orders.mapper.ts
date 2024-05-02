import { OrderEntity } from '../../../database/entities/order.entity';
import { OrderListRequestDto } from '../dto/request/order-list.request.dto';
import { OrderResponseDto } from '../dto/response/order.response.dto';
import { OrdersListResponseDto } from '../dto/response/orders-list.response.dto';

export class OrdersMapper {
  public static toResponseDto(orderEntity: OrderEntity): OrderResponseDto {
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
}
