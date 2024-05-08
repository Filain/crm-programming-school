import { Transform } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class CreateGroupRequestDto {
  @IsArray()
  @IsString()
  @Transform(TransformHelper.trimArray)
  @Transform(TransformHelper.uniqueItems)
  group: string[];
}
