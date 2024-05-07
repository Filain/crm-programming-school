import { CommentEntity } from '../../../database/entities/comment.entity';
import { CommentRespounseDto } from '../dto/response/comment.respounse.dto';

export class CommentsMapper {
  public static toResponseDto(
    commentEntity: CommentEntity,
  ): CommentRespounseDto {
    return {
      id: commentEntity.id,
      comment: commentEntity.comment,
      createdAt: commentEntity.created_at,
      updatedAt: commentEntity.updated_at,
      manager_write: commentEntity.manager_write,
      order_id: commentEntity.order_id,
    };
  }
}
