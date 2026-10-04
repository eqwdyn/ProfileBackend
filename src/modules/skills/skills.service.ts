import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillInput } from './dto/create-skill.input.js';
import { UpdateSkillInput } from './dto/update-skill.input.js';
import { PrismaService } from '../../core/prisma/prisma.service.js';

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSkillInput) {
    const newProject = await this.prisma.skill.create({ data });
    return newProject;
  }

  async findAll() {
    const profiles = await this.prisma.skill.findMany();
    return profiles;
  }

  async findOne(id: number) {
    const project = await this.prisma.skill.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    return project;
  }

  async update(id: number, data: UpdateSkillInput) {
    const existing = await this.findOne(id);

    return this.prisma.skill.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const existing = await this.findOne(id);

    await this.prisma.skill.delete({ where: { id } });
  }
}
