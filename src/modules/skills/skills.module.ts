import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service.js';
import { SkillsResolver } from './skills.resolver.js';

@Module({
  providers: [SkillsResolver, SkillsService],
})
export class SkillsModule {}
