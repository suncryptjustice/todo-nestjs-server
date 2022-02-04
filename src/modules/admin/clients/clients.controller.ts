import {
  Controller,
  Get,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
  Body,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { UserRoles } from '../../auth/decorators/roles.decorator';
import { Roles } from '../../auth/enum/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ResponseMessage } from 'src/shared/types/ResponseMessage';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from 'src/db/entities/client.entity';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin Module - Client Controller')
@ApiBearerAuth('access_token')
@UserRoles(Roles.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @ApiQuery({
    name: 'email',
    required: false,
    type: String,
    example: 'test@test.com',
  })
  @ApiQuery({
    name: 'role',
    required: false,
    enumName: 'Role',
    enum: Roles,
    example: Roles.CLIENT,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 10,
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
    example: 0,
  })
  @Get()
  findAll(
    @Query('email') email: string,
    @Query('role') role: string,
    @Query('limit') limit: number,
    @Query('skip') skip: number,
  ): Promise<[Omit<Client, 'password'>[], number]> {
    return this.clientsService.findAll(email, role, limit, skip);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Omit<Client, 'password'>> {
    return this.clientsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<Partial<Client>> {
    return this.clientsService.update(+id, updateClientDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<ResponseMessage> {
    return this.clientsService.delete(+id);
  }
}
