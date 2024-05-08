import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { ECourses } from '../../../../common/enums/courses.enum';
import { ECoursesFormat } from '../../../../common/enums/courses-format.enum';
import { ECoursesType } from '../../../../common/enums/courses-type.enum';
import { EStatus } from '../../../../common/enums/status.enum';

export class OrderFilterRequestDto {
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
  course?: string;

  @IsOptional()
  @IsString()
  @IsEnum(ECoursesFormat)
  course_format?: string;

  @IsOptional()
  @IsString()
  @IsEnum(ECoursesType)
  course_type?: string;

  @IsOptional()
  @IsInt()
  alreadyPaid?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  created_at?: Date;

  @IsOptional()
  @IsString()
  @IsEnum(EStatus)
  status?: string;

  @IsOptional()
  @IsString()
  group?: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  page?: number = 1;

  @Type(() => String)
  @IsString()
  @IsOptional()
  sortBy?: string = '-id';
}
