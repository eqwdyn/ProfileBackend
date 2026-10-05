import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProfileService } from './profile.service.js';
import { Profile } from './entities/profile.entity.js';
import { CreateProfileInput } from './dto/create-profile.input.js';
import { RelateExperienceInput } from './dto/relate-experience.input.js';
import { RelateProjectInput } from './dto/relate-project.input.js';
import { RelateSkillInput } from './dto/relate-skill.input.js';
import { UpdateProfileInput } from './dto/update-profile.input.js';
import { Project } from '../projects/entities/project.entity.js';
import { Experience } from '../experiences/entities/experience.entity.js';
import { Skill } from '../skills/entities/skill.entity.js';
import { SkillsService } from '../skills/skills.service.js';
import { ExperiencesService } from '../experiences/experiences.service.js';
import { ProjectsService } from '../projects/projects.service.js';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(
    private readonly profileService: ProfileService,
    private readonly skillService: SkillsService,
    private readonly experienceService: ExperiencesService,
    private readonly projectService: ProjectsService,
  ) {}

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
  @ResolveField(() => [Skill], { nullable: true })
  async skills(@Parent() profile: Profile) {
    if (!profile.skills) {
      profile.skills = await this.skillService.findByProfileId(profile.id);
    }
    return profile.skills;
  }

  @ResolveField(() => [Experience], { nullable: true })
  async experiences(@Parent() profile: Profile) {
    if (!profile.experiences) {
      profile.experiences = await this.experienceService.findByProfileId(
        profile.id,
      );
    }
    return profile.experiences;
  }

  @ResolveField(() => [Project], { nullable: true })
  async projects(@Parent() profile: Profile) {
    if (!profile.projects) {
      profile.projects = await this.projectService.findByProfileId(profile.id);
    }
    return profile.projects;
  }

  @Query(() => Profile, { name: 'profile' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.profileService.findOne(id);
  }

  @Mutation(() => Profile)
  updateProfile(
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
  ) {
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
