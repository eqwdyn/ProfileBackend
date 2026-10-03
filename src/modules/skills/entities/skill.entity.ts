import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Skill {
  @Field(() => String, { description: 'Developer skill' })
  name: string;
}
