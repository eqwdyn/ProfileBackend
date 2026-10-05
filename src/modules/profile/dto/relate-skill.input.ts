import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class RelateSkillInput {
  @Field(() => ID)
  skillId: number;

  @Field(() => ID)
  profileId: number;
}
