import 'pg';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { CoreModule } from '../src/core/core.module.js';

let cachedApp: express.Express;

async function bootstrap() {
  if (cachedApp) return cachedApp;

  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(CoreModule, adapter, {
    logger: ['error', 'warn'],
  });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  await app.init();
  cachedApp = expressApp;
  return expressApp;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const app = await bootstrap();
    return app(req as any, res as any);
  } catch (error: any) {
    console.error('NEST INIT ERROR:', error);
    res.status(500).json({
      error: error?.message || 'Unknown error',
      stack: error?.stack?.split('\n').slice(0, 5),
    });
  }
}
