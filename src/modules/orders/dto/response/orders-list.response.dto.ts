import { OrderResponseDto } from './order.response.dto';

export class OrdersListResponseDto {
  data: OrderResponseDto[];
  meta: {
    page: number;
    total: number;
  };
}
