import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    required: true,
    type: String,
    example: 'Meet with friends',
    minLength: 5,
    maxLength: 40,
  })
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(40)
  title: string;

  @ApiProperty({
    required: true,
    type: String,
    example: 'Call everyone and invite them to the party',
    minLength: 5,
    maxLength: 300,
  })
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(300)
  description: string;
}
