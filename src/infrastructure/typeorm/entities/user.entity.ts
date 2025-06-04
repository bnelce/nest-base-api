import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: 'active' })
  status: string;

  @ManyToMany(() => Role, { eager: true })
  @JoinTable()
  roles: Role[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
