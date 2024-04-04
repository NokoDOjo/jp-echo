import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StepService {
  constructor(private prismaService: PrismaService) {}

  async getSteps() {
    return await this.prismaService.step.findMany({
      orderBy: {
        order: 'asc',
      },
    });
  }
}
