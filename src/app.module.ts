import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { SkillsModule } from './skills/skills.module.js';
import { ExperienceModule } from './experience/experience.module.js';
import { ProjectsModule } from './projects/projects.module.js';
import { ProfileModule } from './profile/profile.module.js';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/generated/graphql/schema.gql'),
      sortSchema: true,
    }),
    ProfileModule,
    SkillsModule,
    ExperienceModule,
    ProjectsModule,
  ],
})
export class AppModule {}
