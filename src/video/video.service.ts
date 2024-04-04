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
        Subtitle: {
          include: {
            WordSubtitleRelation: {
              include: {
                word: true,
              },
            },
          },
        },
        Quiz: true,
      },
    });

    console.log(video.Subtitle[0].WordSubtitleRelation);
    console.log(video.Quiz[0].choice);

    return { steps, video };
  }
}
