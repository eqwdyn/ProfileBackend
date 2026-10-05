import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProfileService } from './profile.service.js';
import { Profile } from './entities/profile.entity.js';
import { CreateProfileInput } from './dto/create-profile.input.js';
import { RelateExperienceInput } from './dto/relate-experience.input.js';
import { RelateProjectInput } from './dto/relate-project.input.js';
import { RelateSkillInput } from './dto/relate-skill.input.js';
import { UpdateProfileInput } from './dto/update-profile.input.js';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation(() => Profile)
  createProfile(
    @Args('createProfileInput') createProfileInput: CreateProfileInput,
  ) {
    return this.profileService.create(createProfileInput);
  }

  @Mutation(() => Profile)
  relateExperience(
    @Args('relateExperienceInput') relateExperienceInput: RelateExperienceInput,
  ) {
    return this.profileService.relateExperience(relateExperienceInput);
  }
  @Mutation(() => Profile)
  relateProject(
    @Args('relateExperienceInput') relateProjectInput: RelateProjectInput,
  ) {
    return this.profileService.relateProject(relateProjectInput);
  }
  @Mutation(() => Profile)
  relateSkill(@Args('relateSkillInput') relateSkillInput: RelateSkillInput) {
    return this.profileService.relateSkill(relateSkillInput);
  }

  @Query(() => [Profile], { name: 'profiles' })
  findAll() {
    return this.profileService.findAll();
  }

  @Query(() => Profile, { name: 'profile' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.profileService.findOne(id);
  }

  @Mutation(() => Profile)
  updateProfile(
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
  ) {
    if (!updateProfileInput.id) {
      throw new Error('id is required to update a profile');
    }
    return this.profileService.update(
      updateProfileInput.id,
      updateProfileInput,
    );
  }

  @Mutation(() => Profile)
  removeProfile(@Args('id', { type: () => Int }) id: number) {
    return this.profileService.remove(id);
  }
}
