import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { registerAs } from '@nestjs/config';

export default registerAs('db', (): SqliteConnectionOptions => {
  return {
    type: 'sqlite',
    database: process.env.DB_NAME,
    entities: ['dist/**/db/**/*.entity.js'],
    synchronize: false,
    migrations: ['dist/**/db/migrations/*.js'],
    subscribers: ['dist/**/**/*.subscriber.js'],
    logging: true,
    cli: {
      migrationsDir: 'src/db/migrations',
    },
  };
});
