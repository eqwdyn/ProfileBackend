import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service.js';
import { ProjectsResolver } from './projects.resolver.js';

@Module({
  providers: [ProjectsResolver, ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
