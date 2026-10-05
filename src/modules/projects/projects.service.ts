import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service.js';
import { CreateProjectInput } from './dto/create-project.input.js';
import { UpdateProjectInput } from './dto/update-project.input.js';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProjectInput) {
    const newProject = await this.prisma.project.create({ data });
    return newProject;
  }

  async findAll() {
    const projects = await this.prisma.project.findMany();
    return projects;
  }

  async findOne(id: number) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    return project;
  }

  async findByProfileId(profileId: number) {
    const records = await this.prisma.profileProject.findMany({
      where: { profileId },
      include: { project: true },
    });
    return records.map((r) => r.project);
  }

  async update(id: number, data: UpdateProjectInput) {
    const existing = await this.findOne(id);

    return this.prisma.project.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const existing = await this.findOne(id);

    await this.prisma.project.delete({ where: { id } });
  }
}
