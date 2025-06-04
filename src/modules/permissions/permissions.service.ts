import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  async create(data: Partial<Permission>): Promise<Permission> {
    const permission = this.permissionsRepository.create(data);
    return this.permissionsRepository.save(permission);
  }

  async findAll(): Promise<Permission[]> {
    return this.permissionsRepository.find();
  }

  async findOne(id: string): Promise<Permission> {
    const permission = await this.permissionsRepository.findOne({ where: { id } });
    if (!permission) throw new NotFoundException('Permission not found');
    return permission;
  }

  async update(id: string, data: Partial<Permission>): Promise<Permission> {
    const permission = await this.findOne(id);
    Object.assign(permission, data);
    return this.permissionsRepository.save(permission);
  }

  async remove(id: string): Promise<void> {
    const result = await this.permissionsRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Permission not found');
  }
}
