import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class RelateExperienceInput {
  @Field(() => ID)
  experienceId: number;

  @Field(() => ID)
  profileId: number;
}
