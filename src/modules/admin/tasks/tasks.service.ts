import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Task } from '../../../db/entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async findAll(
    title: string,
    limit: number,
    skip: number,
  ): Promise<[Task[], number]> {
    try {
      return await this.tasksRepository.findAndCount({
        where: {
          title: title ? Like(`%${title}%`) : Like(`%%`),
        },
        take: limit ? limit : 20,
        skip: skip ? skip : 0,
        order: { id: 'ASC' },
      });
    } catch (error) {
      throw new HttpException('Unable to get clients', HttpStatus.BAD_REQUEST);
    }
  }
}
