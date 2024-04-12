import { Injectable } from '@nestjs/common';
import { Quiz, Step, Video } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { StepService } from 'src/step/step.service';

type VideoDetail = {
  steps: Step[];
  url: string;
  keywords: Keyword[];
  quiz: Quiz[];
};

type Keyword = {
  japanese: string;
  chinese: string;
  timestampStart: number;
  timestampEnd: number;
};

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

    const keywords = video.subtitle.wordSubtitleRelation.map((wordRelation) =>
      Object.assign(wordRelation.word, {
        timestampStart: wordRelation.timestampStart,
        timestampEnd: wordRelation.timestampEnd,
      }),
    );
    
    return { steps, url: video.url, keywords, quiz: video.quiz };
  }
}
