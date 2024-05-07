import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { EStatus } from '../../../common/enums/status.enum';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { CommentsRepository } from '../../repository/services/comments.repository';
import { OrderRepository } from '../../repository/services/order.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { CreateCommentRequestDto } from '../dto/request/create-comment.request.dto';
import { UpdateCommentRequestDto } from '../dto/request/update-comment.request.dto';
import { CommentRespounseDto } from '../dto/response/comment.respounse.dto';
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

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentRequestDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
