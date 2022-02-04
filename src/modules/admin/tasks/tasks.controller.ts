import {
  Controller,
  Get,
  UseGuards,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UserRoles } from '../../auth/decorators/roles.decorator';
import { Roles } from '../../auth/enum/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ApiBearerAuth, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Task } from '../../../db/entities/task.entity';

@ApiTags('Admin Module - Tasks Controller')
@ApiBearerAuth('access_token')
@UserRoles(Roles.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiQuery({
    name: 'title',
    required: false,
    type: String,
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
    @Query('title') title: string,
    @Query('limit') limit: number,
    @Query('skip') skip: number,
  ): Promise<[Task[], number]> {
    return this.tasksService.findAll(title, limit, skip);
  }
}
