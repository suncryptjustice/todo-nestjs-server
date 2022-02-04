import { TasksModule } from '../modules/admin/tasks/tasks.module';
import { AdminModule } from '../modules/admin/admin.module';
import { ClientsModule } from '../modules/admin/clients/client.module';
import { ClientModule } from '../modules/client/client.module';
import { ClientsModule as Client_ClientsModule } from '../modules/client/clients/client.module';
import { TasksModule as Client_TasksModule } from '../modules/client/tasks/tasks.module';

const routerConfig = [
  {
    path: 'admin',
    module: AdminModule,
    children: [
      {
        path: 'clients',
        module: ClientsModule,
      },
      {
        path: 'tasks',
        module: TasksModule,
      },
    ],
  },
  {
    path: '',
    module: ClientModule,
    children: [
      {
        path: 'clients',
        module: Client_ClientsModule,
      },
      {
        path: 'tasks',
        module: Client_TasksModule,
      },
    ],
  },
];

export default routerConfig;
