import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class OrderListRequestDto {
  // @Type(() => Number)
  // @IsInt()
  // @Min(1)
  // @Max(100)
  // @IsOptional()
  // limit?: number = 25;
  //
  // @Type(() => Number)
  // @IsInt()
  // @Min(0)
  // @IsOptional()
  // offset?: number = 0;

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
