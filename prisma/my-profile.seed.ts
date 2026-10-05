import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { exit } from 'process';

const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.profileSkill.deleteMany();
  await prisma.profileExperience.deleteMany();
  await prisma.profileProject.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.project.deleteMany();
  await prisma.profile.deleteMany();

  const profile = await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Куксенок Александр',
      description:
        'JavaScript Fullstack Developer. Fullstack-разработчик с 2+ годами опыта. Пишу на JavaScript как клиент (NextJs), так и сервер (NestJs). Закрываю задачи полного цикла: от генерации идеи и проектирования UI/UX до реализации и поддержки продукта.',
    },
  });

  const skillNames = [
    'JavaScript',
    'TypeScript',
    'Node.js',
    'Express',
    'NestJs',
    'React',
    'NextJs',
    'Redux',
    'React Native',
    'Expo',
    'HTML',
    'CSS',
    'SCSS',
    'SASS',
    'SQL',
    'Postgres',
    'MySQL',
    'Redis',
    'Kafka',
    'REST',
    'API',
    'WebSocket',
    'GraphQL',
    'gRPC',
    'Python',
    'FastApi',
    'Git',
    'Docker',
    'Nginx',
    'Linux',
    'English B1',
  ];

  const skills = await Promise.all(
    skillNames.map((name) =>
      prisma.skill.upsert({
        where: { name },
        update: {},
        create: { name },
      }),
    ),
  );

  await prisma.profileSkill.createMany({
    data: skills.map((s) => ({ profileId: profile.id, skillId: s.id })),
    skipDuplicates: true,
  });

  const experience = await prisma.experience.upsert({
    where: { company: 'ICL-КПО ВС' },
    update: {},
    create: {
      company: 'ICL-КПО ВС',
      position: 'Fullstack-разработчик',
      startDate: new Date('2023-05-01'),
      endDate: new Date('2025-11-30'),
      achievements: [
        'Разрабатывал и поддерживал функциональные модули на React, NextJs и React Native, обеспечивая кроссплатформенную совместимость и высокую производительность UI.',
        'Реализовал REST API на NestJs, хранением данных в Postgres и MySQL, оптимизировал и кэшировал запросы с помощью Redis для снижения нагрузки БД на 60%.',
        'Разбил монолитную архитектуру на микросервисы, используя Apache Kafka, что позволило компании выделить команду под каждый микросервис.',
        'Участвовал в деплое приложений на Linux-серверы, контейнеризировал сервисы с помощью Docker, снижал нагрузки на сервера с помощью Nginx.',
      ],
    },
  });

  await prisma.profileExperience.create({
    data: {
      profileId: profile.id,
      experienceId: experience.id,
    },
  });

  const projectsData = [
    {
      name: 'Сайт для гештальт-терапевта',
      description:
        'Заказной проект — сайт для практикующего гештальт-терапевта.',
    },
    {
      name: 'Сайт кафе "Морячка"',
      description: 'Заказной проект — сайт для кафе.',
    },
    {
      name: 'Сайт для ИП, завод плитки',
      description:
        'Заказной проект — сайт для индивидуального предпринимателя, производителя плитки.',
    },
    {
      name: 'Сайт по продаже авто',
      description: 'Заказной проект — сайт для продажи автомобилей.',
    },
  ];

  const projects = await Promise.all(
    projectsData.map((p) =>
      prisma.project.create({
        data: {
          name: p.name,
          description: p.description,
        },
      }),
    ),
  );

  await prisma.profileProject.createMany({
    data: projects.map((p) => ({ profileId: profile.id, projectId: p.id })),
    skipDuplicates: true,
  });

  console.log('Seed completed successfully');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
    exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    exit(1);
  });
