import { CreateSkillInput } from './create-skill.input.js';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSkillInput extends PartialType(CreateSkillInput) {
  @Field(() => Int)
  id: number;
}
