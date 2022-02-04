import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Client } from 'src/db/entities/client.entity';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';

@ApiTags('Client Module - Client Controller')
@Controller()
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @ApiBody({ type: CreateClientDto })
  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  create(
    @Body() createClientDto: CreateClientDto,
  ): Promise<Omit<Client, 'password'>> {
    return this.clientsService.create(createClientDto);
  }
}
