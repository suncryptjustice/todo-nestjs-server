import { Roles } from '../../modules/auth/enum/role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Task } from './task.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'clients' })
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Exclude()
  @Column({ nullable: false, unique: false })
  password: string;

  @Column({
    default: Roles.CLIENT,
    nullable: false,
  })
  role: string;

  @OneToMany(() => Task, (task) => task.creator, {
    nullable: true,
  })
  tasks: Task[];

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  public updated_at: Date;
}
