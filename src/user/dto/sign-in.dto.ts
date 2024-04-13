import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class SignInDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minSymbols: 0,
    minNumbers: 4,
    minLowercase: 0,
  })
  password: string;
}
