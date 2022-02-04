import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Client } from '../../../db/entities/client.entity';
import { ResponseMessage } from '../../../shared/types/ResponseMessage';
import transactionWrapper from '../../../helpers/transactionWrapper';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  async findAll(
    email: string,
    role: string,
    limit: number,
    skip: number,
  ): Promise<[Omit<Client, 'password'>[], number]> {
    try {
      return await this.clientsRepository.findAndCount({
        where: {
          email: email ? Like(`%${email}%`) : Like(`%%`),
          role: role ? role : Like(`%%`),
        },
        relations: ['tasks'],
        take: limit ? limit : 0,
        skip: skip ? skip : 0,
        order: { id: 'ASC' },
      });
    } catch (error) {
      throw new HttpException('Unable to get clients', HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number): Promise<Omit<Client, 'password'>> {
    try {
      return await this.clientsRepository.findOneOrFail(
        { id: id },
        {
          relations: ['tasks'],
        },
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneWithEmail(email: string): Promise<Client> {
    try {
      return await this.clientsRepository.findOneOrFail({ email: email });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    id: number,
    updateClientDto: UpdateClientDto,
  ): Promise<Partial<Client>> {
    try {
      const updateClient = transactionWrapper(async (queryRunner) => {
        await queryRunner.manager.findOneOrFail(Client, { id: id });
        return await queryRunner.manager.save(Client, {
          id: id,
          ...updateClientDto,
        });
      });
      return await updateClient();
    } catch (error) {
      throw new HttpException(
        'Unable to update client',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: number): Promise<ResponseMessage> {
    try {
      const deleteUser = transactionWrapper(async (queryRunner) => {
        const result = await queryRunner.manager.delete(Client, {
          id: id,
        });
        if (result.affected > 0) {
          return { status: HttpStatus.OK, message: 'Client was deleted' };
        } else {
          throw new Error('Unable to delete');
        }
      });
      return await deleteUser();
    } catch (error) {
      throw new HttpException(
        'Unable to delete client',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
