import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  name: string;

  @Column({ nullable: true, length: 255 })
  description: string;

  @ManyToMany(() => Role, role => role.permissions)
  roles: Role[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
