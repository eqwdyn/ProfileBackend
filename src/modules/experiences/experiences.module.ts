import { Module } from '@nestjs/common';
import { ExperiencesService } from './experiences.service.js';
import { ExperiencesResolver } from './experiences.resolver.js';

@Module({
  providers: [ExperiencesResolver, ExperiencesService],
})
export class ExperiencesModule {}
