import { IsInt, IsString } from 'class-validator';

export class CreateCommentRequestDto {
  @IsString()
  comment: string;

  @IsInt()
  order_id: number;
}
