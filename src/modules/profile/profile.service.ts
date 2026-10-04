import { Injectable } from '@nestjs/common';
import { CreateProfileInput } from './dto/create-profile.input.js';
// import { UpdateProfileInput } from './dto/update-profile.input.js';
import { PrismaService } from '../../core/prisma/prisma.service.js';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProfileInput) {
    const newProfile = await this.prisma.profile.create({ data });
    return newProfile;
  }

  async findAll() {
    const profiles = await this.prisma.profile.findMany();
    return profiles;
  }

  async findOne(id: number) {
    const profile = await this.prisma.profile.findUnique({
      where: { id },
    });

    return profile;
  }

  //   async update(id: string, data: UpdateProfileInput) {
  //     return this.prisma.profile.update({
  //       where: { id },
  //       data,
  //     });
  //   }

  async remove(id: number) {
    return this.prisma.profile.delete({
      where: { id },
    });
  }
}
