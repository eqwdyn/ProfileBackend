import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Experience {
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
