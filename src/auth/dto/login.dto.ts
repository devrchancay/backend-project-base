import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  @ApiProperty()
  readonly password: string;
}
