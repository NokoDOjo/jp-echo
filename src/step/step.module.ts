import { Module } from '@nestjs/common';
import { StepService } from './step.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [StepService],
  exports: [StepService],
  imports: [PrismaModule],
})
export class StepModule {}
