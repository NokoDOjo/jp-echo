import { Injectable } from '@nestjs/common';
import { Step, Video } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { StepService } from 'src/step/step.service';

type VideoDetail = {
  video: Video;
  steps: Step[];
}

@Injectable()
export class VideoService {
  constructor(
    private prismaService: PrismaService,
    private stepService: StepService,
  ) {}
  async getVideoDetail(videoId: number): Promise<VideoDetail> {
    const steps = await this.stepService.getSteps();

    const video = await this.prismaService.video.findUnique({
      where: {
        id: videoId,
      },
      include: {
        subtitle: {
          include: {
            wordSubtitleRelation: {
              include: {
                word: true,
              },
            },
          },
        },
        quiz: true,
      },
    });

    console.log(video.subtitle);
    console.log(video.quiz);

    return { steps, video };
  }
}
