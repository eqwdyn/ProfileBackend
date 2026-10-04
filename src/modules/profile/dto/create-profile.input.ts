import { InputType, Field } from '@nestjs/graphql';
import { Experience } from '../../experiences/entities/experience.entity.js';
import { Project } from '../../projects/entities/project.entity.js';
import { Skill } from '../../skills/entities/skill.entity.js';

@InputType()
export class CreateProfileInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [Experience])
  experiences?: Experience[];

  @Field(() => [Project])
  projects?: Project[];

  @Field(() => [Skill])
  skills?: Skill[];
}
