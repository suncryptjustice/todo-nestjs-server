import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Delete,
  Param,
  Patch,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import User, { UserPayload } from '../../../shared/decorators/user.decorator';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from 'src/db/entities/task.entity';
import { ResponseMessage } from 'src/shared/types/ResponseMessage';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClassSerializerInterceptor } from '@nestjs/common';

@ApiTags('Client Module - Tasks Controller')
@ApiBearerAuth('access_token')
@UseGuards(JwtAuthGuard)
@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAll(@User() user: UserPayload): Promise<Task[]> {
    return this.tasksService.getAll(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(
    @User() user: UserPayload,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.tasksService.create(user, createTaskDto);
  }

  @Patch(':order_id')
  update(
    @User() user,
    @Param('order_id') order_id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Partial<Task>> {
    return this.tasksService.update(user, +order_id, updateTaskDto);
  }

  @Delete(':order_id')
  delete(
    @User() user: UserPayload,
    @Param('order_id') order_id: string,
  ): Promise<ResponseMessage> {
    return this.tasksService.delete(user, +order_id);
  }
}
