import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class RelateProjectInput {
  @Field(() => ID)
  projectId: number;

  @Field(() => ID)
  profileId: number;
}
