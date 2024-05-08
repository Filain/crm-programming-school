import { PickType } from '@nestjs/swagger';

import { BaseOrderResponseDto } from './baseOrder.response.dto';

export class OrdersResponseDto extends PickType(BaseOrderResponseDto, [
  'id',
  'name',
  'surname',
  'email',
  'phone',
  'age',
  'course',
  'course_format',
  'course_type',
  'sum',
  'alreadyPaid',
  'created_at',
  'status',
  'group',
]) {}
