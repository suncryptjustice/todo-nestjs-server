import { Injectable } from '@nestjs/common/decorators';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from '../../../db/entities/task.entity';
import transactionWrapper from 'src/helpers/transactionWrapper';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UserPayload } from 'src/shared/decorators/user.decorator';
import { ResponseMessage } from 'src/shared/types/ResponseMessage';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getAll({ id }: UserPayload): Promise<Task[]> {
    try {
      if (!id) throw new Error('Unable to get tasks');
      return await transactionWrapper(async (queryRunner): Promise<Task[]> => {
        return await queryRunner.manager.find(Task, {
          where: {
            creator: {
              id: id,
            },
          },
          order: {
            id: 'ASC',
          },
        });
      })();
    } catch (error) {}
  }

  async create(
    { id }: UserPayload,
    createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    try {
      if (!id) throw new Error('Unable to get tasks');
      const task = this.tasksRepository.create({
        ...createTaskDto,
        creator: { id: id },
      });
      return await this.tasksRepository.save(task);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(
    { id }: UserPayload,
    order_id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Partial<Task>> {
    try {
      const updateTaskRecord = transactionWrapper(async (queryRunner) => {
        const task = await queryRunner.manager.findOneOrFail(
          Task,
          {
            id: order_id,
          },
          { relations: ['creator'] },
        );

        if (task.creator.id === id) {
          return await queryRunner.manager.save(Task, {
            id: order_id,
            ...updateTaskDto,
          });
        } else {
          throw new Error("Don't have permission to delete this task");
        }
      });
      return await updateTaskRecord();
    } catch (error) {
      throw new HttpException(
        'Unable to update task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(
    { id }: UserPayload,
    order_id: number,
  ): Promise<ResponseMessage> {
    try {
      const deleteTaskRecord = transactionWrapper(async (queryRunner) => {
        const task = await queryRunner.manager.findOneOrFail(
          Task,
          {
            id: order_id,
          },
          { relations: ['creator'] },
        );

        if (task.creator.id === id) {
          const res = await queryRunner.manager.delete(Task, { id: order_id });
          if (res.affected > 0) {
            return { status: HttpStatus.OK, message: 'Task was deleted' };
          } else {
            throw new Error('Unable to delete');
          }
        } else {
          throw new Error("Don't have permission to delete this task");
        }
      });
      return await deleteTaskRecord();
    } catch (error) {
      throw new HttpException(
        'Unable to delete task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
