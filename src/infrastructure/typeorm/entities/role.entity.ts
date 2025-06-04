import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from './user.entity';
import { Permission } from './permission.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  name: string;

  @Column({ nullable: true, length: 255 })
  description: string;

  @ManyToMany(() => User, user => user.roles)
  users: User[];

  @ManyToMany(() => Permission, { eager: true })
  @JoinTable()
  permissions: Permission[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
