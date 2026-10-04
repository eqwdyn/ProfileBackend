import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Skill {
  @Field(() => ID)
  id: number;

  @Field(() => String, { description: 'Developer skill' })
  name: string;
}
