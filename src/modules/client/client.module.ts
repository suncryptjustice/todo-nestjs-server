import { Module } from '@nestjs/common/decorators';
import { ClientsModule } from './clients/client.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule, ClientsModule],
})
export class ClientModule {}
