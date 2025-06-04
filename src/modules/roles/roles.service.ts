import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  async create(data: Partial<Role>): Promise<Role> {
    if (data.permissions) {
      data.permissions = await this.permissionsRepository.findByIds(
        data.permissions.map((p) => p.id),
      );
    }
    const role = this.rolesRepository.create(data);
    return this.rolesRepository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return this.rolesRepository.find();
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.rolesRepository.findOne({ where: { id } });
    if (!role) throw new NotFoundException('Role not found');
    return role;
  }

  async update(id: string, data: Partial<Role>): Promise<Role> {
    const role = await this.findOne(id);
    if (data.permissions) {
      data.permissions = await this.permissionsRepository.findByIds(
        data.permissions.map((p) => p.id),
      );
    }
    Object.assign(role, data);
    return this.rolesRepository.save(role);
  }

  async remove(id: string): Promise<void> {
    const result = await this.rolesRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Role not found');
  }
}
