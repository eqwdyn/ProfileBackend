import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateSkillInput {
  @Field(() => String)
  name: string;

  @Field(() => ID)
  profileId: number;
}
