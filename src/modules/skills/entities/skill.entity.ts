import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Skill {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;
}
