import { Injectable } from '@nestjs/common';
import { CreateProfileInput } from './dto/create-profile.input.js';
import { UpdateProfileInput } from './dto/update-profile.input.js';
import { PrismaService } from '../../core/prisma/prisma.service.js';

@Injectable()
export class ProfileService {
    constructor(private readonly prisma: PrismaService) {}

  create(createProfileInput: CreateProfileInput) {
    return 'This action adds a new profile';
  }

  findAll() {
    const profile = this.prisma.;
    return profile;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileInput: UpdateProfileInput) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
