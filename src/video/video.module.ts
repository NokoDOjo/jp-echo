import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StepModule } from 'src/step/step.module';

@Module({
  controllers: [VideoController],
  providers: [VideoService],
  imports: [PrismaModule, StepModule],
})
export class VideoModule {}
