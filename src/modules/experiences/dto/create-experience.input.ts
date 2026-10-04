import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateExperienceInput {
  @Field()
  company: string;

  @Field()
  position: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;

  @Field(() => [String])
  achievements: string[];
}
