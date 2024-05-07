import { CommentRespounseDto } from '../../../comments/dto/response/comment.respounse.dto';

export class OrderResponseDto {
  massage: string;
  utm: string;
  comments?: CommentRespounseDto[];
}
