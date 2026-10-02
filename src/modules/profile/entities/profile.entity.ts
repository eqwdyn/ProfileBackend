import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Profile {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  //   @Field(() => [Skill], { nullable: true })
  //   skills: Skill[];

  //   @Field(() => [Experience], { nullable: true })
  //   experiences: Experience[];

  //   @Field(() => [Project], { nullable: true })
  //   projects: Project[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
