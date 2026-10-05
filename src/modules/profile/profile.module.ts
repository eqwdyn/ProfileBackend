import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service.js';
import { ProfileResolver } from './profile.resolver.js';
import { PrismaModule } from '../../core/prisma/prisma.module.js';
import { ExperiencesModule } from '../experiences/experiences.module.js';
import { SkillsModule } from '../skills/skills.module.js';
import { ProjectsModule } from '../projects/projects.module.js';

@Module({
  imports: [PrismaModule, ExperiencesModule, SkillsModule, ProjectsModule],
  providers: [ProfileResolver, ProfileService],
})
export class ProfileModule {}
