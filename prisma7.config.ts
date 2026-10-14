import 'dotenv/config';
import { defineConfig } from 'prisma/config';

const dbUrl = process.env.POSTGRES_PRISMA_URL;
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
