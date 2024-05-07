import { PartialType } from '@nestjs/mapped-types';

import { CreateCommentRequestDto } from './create-comment.request.dto';

export class UpdateCommentRequestDto extends PartialType(
  CreateCommentRequestDto,
) {}
