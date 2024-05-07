import { OrdersResponseDto } from './orders.response.dto';

export class OrdersListResponseDto {
  data: OrdersResponseDto[];
  meta: {
    page: number;
    total: number;
  };
}
