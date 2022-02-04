import { ConfigModule } from '@nestjs/config';
import dbConfiguration from './config/db.config';

ConfigModule.forRoot({
  isGlobal: true,
  load: [dbConfiguration],
});

export default dbConfiguration();
