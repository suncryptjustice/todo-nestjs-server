import { HttpException, HttpStatus } from '@nestjs/common';
import { Task } from 'src/db/entities/task.entity';
import { getConnection, QueryRunner } from 'typeorm';

function transactionWrapper<T>(fn: (queryRunner: QueryRunner) => Promise<T>) {
  const connection = getConnection();
  const queryRunner: QueryRunner = connection.createQueryRunner();

  return async () => {
    try {
      await queryRunner.startTransaction();
      const result = await fn(queryRunner);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error('Unable to perform transaction, rollback');
    } finally {
      await queryRunner.release();
    }
  };
}

export default transactionWrapper;
