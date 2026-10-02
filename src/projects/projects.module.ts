import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service.js';

@Module({
  providers: [ProjectsService],
})
export class ProjectsModule {}
