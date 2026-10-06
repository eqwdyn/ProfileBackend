import 'dotenv/config';
import { defineConfig } from 'prisma/config';

const isProd = process.env.NODE_ENV === 'production';
const dbUrl = isProd
  ? process.env.POSTGRES_PRISMA_URL
  : `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`;
console.log(`The connection URL is ${dbUrl}`);

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'npx tsx prisma/my-profile.seed.ts',
  },

  datasource: {
    url: dbUrl,
  },
});
