import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto implements CreateTaskDto {
  @ApiProperty({
    required: false,
    type: String,
    example: 'Go to the hospital',
    minLength: 5,
    maxLength: 40,
  })
  @IsOptional()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(40)
  title: string;

  @ApiProperty({
    required: true,
    type: String,
    example: 'Meet that sexy doctor',
    minLength: 5,
    maxLength: 300,
  })
  @IsOptional()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(300)
  description: string;
}
