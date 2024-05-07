import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { CreateCommentRequestDto } from './dto/request/create-comment.request.dto';
import { UpdateCommentRequestDto } from './dto/request/update-comment.request.dto';
import { CommentRespounseDto } from './dto/response/comment.respounse.dto';
import { CommentListRespounseDto } from './dto/response/comment-list.respounse.dto';
import { CommentsService } from './services/comments.service';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create comment' })
  @Post()
  public async createComment(
    @Body() createCommentDto: CreateCommentRequestDto,
    @CurrentUser() userData: IUserData,
  ): Promise<CommentRespounseDto> {
    return await this.commentsService.create(createCommentDto, userData);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all comments' })
  @Get(':order_id')
  public async findAllComments(
    @Param('order_id') order_id: string,
  ): Promise<CommentListRespounseDto> {
    return await this.commentsService.findAllComments(order_id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Take all comments by user' })
  @Put(':comment_id')
  public async updateComment(
    @Param('comment_id') comment_id: string,
    @Body() updateCommentDto: UpdateCommentRequestDto,
    @CurrentUser() userData: IUserData,
  ) {
    return await this.commentsService.updateComment(
      +comment_id,
      updateCommentDto,
      userData,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete comment' })
  @Delete(':comment_id')
  public async remove(@Param('comment_id') comment_id: string) {
    await this.commentsService.remove(+comment_id);
    return {
      message: 'Comment deleted',
    };
  }
}
