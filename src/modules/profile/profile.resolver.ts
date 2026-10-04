import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProfileService } from './profile.service.js';
import { Profile } from './entities/profile.entity.js';
import { CreateProfileInput } from './dto/create-profile.input.js';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation(() => Profile)
  createProfile(
    @Args('createProfileInput') createProfileInput: CreateProfileInput,
  ) {
    return this.profileService.create(createProfileInput);
  }

  @Query(() => [Profile], { name: 'profiles' })
  findAll() {
    return this.profileService.findAll();
  }

  @Query(() => Profile, { name: 'profile' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.profileService.findOne(id);
  }

  //   @Mutation(() => Profile)
  //   updateProfile(
  //     @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
  //   ) {
  //     if (!updateProfileInput.id) {
  //       throw new Error('id is required to update a profile');
  //     }
  //     return this.profileService.update(
  //       updateProfileInput.id,
  //       updateProfileInput,
  //     );
  //   }

  @Mutation(() => Profile)
  removeProfile(@Args('id', { type: () => Int }) id: number) {
    return this.profileService.remove(id);
  }
}
