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

  @SkipAuth()
  @ApiOperation({ summary: 'Get all comments' })
  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  // @SkipAuth()
  // @ApiOperation({ summary: 'Get all users' })
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.commentsService.findOne(+id);
  // }

  @SkipAuth()
  @ApiOperation({ summary: 'Take all comments by user' })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentRequestDto,
  ) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @SkipAuth()
  @ApiOperation({ summary: 'Delete comment' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
