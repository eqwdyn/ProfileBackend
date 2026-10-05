import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class Experience {
  @Field(() => ID)
  id: number;

  @Field()
  company: string;

  @Field()
  position: string;

  @Field(() => GraphQLISODateTime)
  startDate: Date;

  @Field(() => GraphQLISODateTime)
  endDate: Date;

  @Field(() => [String])
  achievements: string[];
}
