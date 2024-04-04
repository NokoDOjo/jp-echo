import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { VideoModule } from './video/video.module';
import { StepModule } from './step/step.module';

@Module({
  imports: [PrismaModule, VideoModule, StepModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
