import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Experience {
  @Field(() => ID)
  id: number;

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
