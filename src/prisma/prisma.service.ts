import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://agwenchez:Agwenchez254@localhost:5434/agiiza',
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  //   async enableShutdownHooks(app: INestApplication) {
  //     this.$on('beforeExit', async () => {
  //       await app.close();
  //     });
  //   }
}
