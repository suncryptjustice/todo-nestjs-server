import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ required: true, type: String, example: 'test@test.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    type: String,
    example: 'testtest',
    minLength: 8,
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
