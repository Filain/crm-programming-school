import { IsInt, IsString } from 'class-validator';

export class UpdateCommentRequestDto {
  @IsString()
  comment: string;

  @IsInt()
  order_id: number;
}
