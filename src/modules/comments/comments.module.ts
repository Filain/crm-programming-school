import { Module } from '@nestjs/common';

import { CommentsRepository } from '../repository/services/comments.repository';
import { CommentsController } from './comments.controller';
import { CommentsService } from './services/comments.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository],
})
export class CommentsModule {}
