import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileInput } from './dto/create-profile.input.js';
import { UpdateProfileInput } from './dto/update-profile.input.js';
import { PrismaService } from '../../core/prisma/prisma.service.js';
import { RelateExperienceInput } from './dto/relate-experience.input.js';
import { RelateProjectInput } from './dto/relate-project.input.js';
import { RelateSkillInput } from './dto/relate-skill.input.js';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProfileInput) {
    const newProfile = await this.prisma.profile.create({ data });
    return newProfile;
  }

  async relateExperience({ experienceId, profileId }: RelateExperienceInput) {
    const profile = await this.prisma.profile.findUnique({
      where: { id: profileId },
    });
    if (!profile) {
      throw new NotFoundException(`Profile with id ${profileId} not found`);
    }

    const experience = await this.prisma.experience.findUnique({
      where: { id: experienceId },
    });
    if (!experience) {
      throw new NotFoundException(
        `Experience with id ${experienceId} not found`,
      );
    }

    const relation = await this.prisma.profileExperience.create({
      data: {
        profileId,
        experienceId,
      },
    });
    return relation;
  }
  async relateProject({ projectId, profileId }: RelateProjectInput) {
    const profile = await this.prisma.profile.findUnique({
      where: { id: profileId },
    });
    if (!profile) {
      throw new NotFoundException(`Profile with id ${profileId} not found`);
    }

    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project) {
      throw new NotFoundException(`Project with id ${projectId} not found`);
    }

    const relation = await this.prisma.profileProject.create({
      data: {
        profileId,
        projectId,
      },
    });
    return relation;
  }
  async relateSkill({ skillId, profileId }: RelateSkillInput) {
    const profile = await this.prisma.profile.findUnique({
      where: { id: profileId },
    });
    if (!profile) {
      throw new NotFoundException(`Profile with id ${profileId} not found`);
    }

    const skill = await this.prisma.skill.findUnique({
      where: { id: skillId },
    });
    if (!skill) {
      throw new NotFoundException(`Skill with id ${skillId} not found`);
    }

    const relation = await this.prisma.profileSkill.create({
      data: {
        profileId,
        skillId,
      },
    });
    return relation;
  }

  async findAll() {
    const profiles = await this.prisma.profile.findMany();
    return profiles;
  }

  async findOne(id: number) {
    const profile = await this.prisma.profile.findUnique({
      where: { id },
      include: {
        skills: true,
        projects: true,
        experiences: true,
      },
    });

    if (!profile) {
      throw new NotFoundException(`Profile with id ${id} not found`);
    }

    return profile;
  }

  async update(id: number, data: UpdateProfileInput) {
    const existing = await this.findOne(id);

    const updated = await this.prisma.profile.update({
      where: { id },
      data,
    });
    return updated;
  }

  async remove(id: number) {
    const existing = await this.findOne(id);

    await this.prisma.profile.delete({
      where: { id },
    });
  }
}
