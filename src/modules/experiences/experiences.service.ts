import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExperienceInput } from './dto/create-experience.input.js';
import { UpdateExperienceInput } from './dto/update-experience.input.js';
import { PrismaService } from '../../core/prisma/prisma.service.js';

@Injectable()
export class ExperiencesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateExperienceInput) {
    const newExperience = await this.prisma.experience.create({ data });
    return newExperience;
  }

  async findAll() {
    return this.prisma.experience.findMany();
  }

  async findOne(id: number) {
    const experience = await this.prisma.experience.findUnique({
      where: { id },
    });

    if (!experience) {
      throw new NotFoundException(`Experience with id ${id} not found`);
    }

    return experience;
  }

  async findByProfileId(profileId: number) {
    const records = await this.prisma.profileExperience.findMany({
      where: { profileId },
      include: { experience: true },
    });
    return records.map((r) => r.experience);
  }

  async update(id: number, data: UpdateExperienceInput) {
    const existing = await this.prisma.experience.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Experience with id ${id} not found`);
    }

    const updated = await this.prisma.experience.update({
      where: { id },
      data: {
        company: data.company,
        position: data.position,
        startDate: data.startDate,
        endDate: data.endDate,
        achievements: data.achievements,
      },
    });
    return updated;
  }

  async remove(id: number) {
    const existing = await this.prisma.experience.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundException(`Experience with id ${id} not found`);
    }

    return this.prisma.experience.delete({ where: { id } });
  }
}
