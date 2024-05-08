import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class SignInRequestDto {
  @ApiProperty({ example: 'test@gmail.com' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  email: string;

  @ApiProperty({ example: '123qwe!@#QWE' })
  @IsNotEmpty()
  @IsString()
  @Length(0, 255)
  password: string;
}
