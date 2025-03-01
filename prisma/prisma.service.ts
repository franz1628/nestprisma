import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: [
        { level: 'query', emit: 'event' }, // Habilita el logging de consultas SQL
        { level: 'info', emit: 'stdout' }, // Muestra mensajes de información
        { level: 'warn', emit: 'stdout' }, // Muestra advertencias
        { level: 'error', emit: 'stdout' }, // Muestra errores
      ],
    });
  }
  
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
