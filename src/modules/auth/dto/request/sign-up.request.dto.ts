import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

import { ERole } from '../../../../common/enums/role.enum';

export class SignUpRequestDto {
  @ApiProperty({ example: 'test@gmail.com' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  email: string;

  @ApiProperty({ example: '123qwe!@#QWE' })
  @IsNotEmpty()
  @IsString()
  @Length(0, 255)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/)
  password: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(ERole)
  roles?: ERole;

  @IsOptional()
  @IsString()
  @Length(3, 30)
  @Type(() => String)
  name?: string;
}
