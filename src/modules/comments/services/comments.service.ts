import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { EStatus } from '../../../common/enums/status.enum';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { CommentsRepository } from '../../repository/services/comments.repository';
import { OrderRepository } from '../../repository/services/order.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { CreateCommentRequestDto } from '../dto/request/create-comment.request.dto';
import { UpdateCommentRequestDto } from '../dto/request/update-comment.request.dto';
import { CommentRespounseDto } from '../dto/response/comment.respounse.dto';
import { CommentListRespounseDto } from '../dto/response/comment-list.respounse.dto';
import { CommentsMapper } from './comments.mapper';

@Injectable()
export class CommentsService {
  constructor(
    private commentsRepository: CommentsRepository,
    private userRepository: UserRepository,
    private ordersRepository: OrderRepository,
  ) {}
  public async create(
    createCommentDto: CreateCommentRequestDto,
    userData: IUserData,
  ): Promise<CommentRespounseDto> {
    const userEntity = await this.userRepository.findOneBy({
      id: userData.userId,
    });
    if (!userEntity) {
      throw new UnprocessableEntityException('User not found');
    }

    const commentEntity = await this.commentsRepository.save(
      this.commentsRepository.create({
        ...createCommentDto,
        manager_write: userEntity.name,
      }),
    );

    const orderEntity = await this.ordersRepository.findOneBy({
      id: createCommentDto.order_id,
    });

    if (!orderEntity) {
      throw new UnprocessableEntityException('Order not found');
    }
    await this.ordersRepository.save(
      this.ordersRepository.create({
        ...orderEntity,
        status: EStatus.IN_WORK,
      }),
    );
    return CommentsMapper.toResponseDto(commentEntity);
  }

  public async findAllComments(
    order_id: string,
  ): Promise<CommentListRespounseDto> {
    const id = +order_id;
    const comments = await this.commentsRepository.findBy({
      order_id: id,
    });
    return CommentsMapper.toListResponseDto(comments);
  }

  public async updateComment(
    comment_id: number,
    updateCommentDto: UpdateCommentRequestDto,
    userData: IUserData,
  ): Promise<CommentRespounseDto> {
    const userEntity = await this.userRepository.findOneBy({
      id: userData.userId,
    });
    if (!userEntity) {
      throw new UnprocessableEntityException('User not found');
    }

    const commentEntity = await this.commentsRepository.findOneBy({
      id: comment_id,
    });
    if (!commentEntity) {
      throw new UnprocessableEntityException('Comment not found');
    }
    const orderEntity = await this.ordersRepository.findOneBy({
      id: updateCommentDto.order_id,
    });

    if (!orderEntity) {
      throw new UnprocessableEntityException('Order not found');
    }
    if (orderEntity.status !== EStatus.IN_WORK) {
      await this.ordersRepository.save(
        this.ordersRepository.create({
          ...orderEntity,
          status: EStatus.IN_WORK,
        }),
      );
    }

    const commentEntityToSave = await this.commentsRepository.save({
      ...commentEntity,
      ...updateCommentDto,
      updated_at: new Date(),
      manager_write: userEntity.name,
    });

    return CommentsMapper.toResponseDto(commentEntityToSave);
  }

  public async remove(comment_id: number) {
    const commentEntity = await this.commentsRepository.findOneBy({
      id: comment_id,
    });
    if (!commentEntity) {
      throw new UnprocessableEntityException('Comment not found');
    }
    await this.commentsRepository.remove(commentEntity);
  }
}
