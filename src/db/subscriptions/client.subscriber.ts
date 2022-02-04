import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Client } from '../entities/client.entity';

@EventSubscriber()
export class ClientSubscriber implements EntitySubscriberInterface<Client> {
  listenTo() {
    return Client;
  }

  async beforeInsert(event: InsertEvent<Client>) {
    event.entity.password = await bcrypt.hash(event.entity.password, 10);
  }

  async beforeUpdate(event: UpdateEvent<Client>) {
    if (event.entity.password)
      event.entity.password = await bcrypt.hash(event.entity.password, 10);
  }
}
