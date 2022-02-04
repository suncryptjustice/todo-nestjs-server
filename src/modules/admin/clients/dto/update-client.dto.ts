import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Roles } from 'src/modules/auth/enum/role.enum';

export class UpdateClientDto {
  @ApiProperty({ required: false, type: String, example: 'test@test.com' })
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: false,
    enumName: 'Role',
    enum: Roles,
    example: Roles.CLIENT,
  })
  @IsOptional()
  @IsString()
  @IsEnum(Roles)
  role: Roles;
}
