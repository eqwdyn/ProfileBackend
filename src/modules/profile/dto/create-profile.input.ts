import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProfileInput {
  @Field()
  name: string;

  @Field()
  description: string;
}
