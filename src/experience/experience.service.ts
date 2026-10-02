import { Injectable } from '@nestjs/common';

@Injectable()
export class ExperienceService {
  getProfile() {
    return {
      name: 'Александр',
      description:
        'Fullstack-разработчик с 2+ годами опыта. Пишу на JavaScript как клиент (NextJs), так и сервер (NestJs). Закрываю задачи полного цикла: от генерации идеи и проектирования UI/UX до реализации и поддержки продукта. Владею стеком для фронтенда и мобильной разработки, прорабатываю бэкенд-логику, участвую в деплое и сопровождении веб приложений.',
      links: {
        GitHub: 'https://github.com/eqwdyn',
      },
    };
  }
}
