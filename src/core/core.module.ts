import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ProfileModule } from '../modules/profile/profile.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { tmpdir } from 'os';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(tmpdir(), 'schema.gql'),
      sortSchema: true,
      playground: true,
      introspection: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    ProfileModule,
    PrismaModule,
  ],
})
export class CoreModule {}
