import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

import { ECourses } from '../../../../common/enums/courses.enum';
import { ECoursesFormat } from '../../../../common/enums/courses-format.enum';
import { ECoursesType } from '../../../../common/enums/courses-type.enum';
import { EStatus } from '../../../../common/enums/status.enum';

export class OrderUpdateRequestDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  surname?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsOptional()
  @IsString()
  @IsEnum(ECourses)
  @ApiProperty({ example: ECourses.FE })
  course?: string;

  @IsOptional()
  @IsString()
  @IsEnum(ECoursesFormat)
  @ApiProperty({ example: ECoursesFormat.ONLINE })
  course_format?: string;

  @IsOptional()
  @IsString()
  @IsEnum(ECoursesType)
  @ApiProperty({ example: ECoursesType.FREE })
  course_type?: string;

  @IsOptional()
  @IsInt()
  sum?: number;

  @IsOptional()
  @IsInt()
  alreadyPaid?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  created_at?: Date;

  @IsOptional()
  @IsString()
  utm?: string;

  @IsOptional()
  @IsString()
  msg?: string;

  @IsOptional()
  @IsString()
  @IsEnum(EStatus)
  @ApiProperty({ example: EStatus.NEW })
  status?: string;

  @IsOptional()
  @IsString()
  group?: string;
}
