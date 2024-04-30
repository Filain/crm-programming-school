import { OrderResponseDto } from './order.response.dto';

export class OrdersListResponseDto {
  data: OrderResponseDto[];
  meta: {
    limit: number;
    total: number;
    offset: number;
  };
}
