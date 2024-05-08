import { IsString } from 'class-validator';

export class CreateGroupRequestDto {
  @IsString()
  group: string;
}
