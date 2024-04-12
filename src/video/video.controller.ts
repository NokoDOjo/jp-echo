import { Controller, Get, Param } from '@nestjs/common';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get(':id')
  getSteps(@Param('id') id: string) {
    return this.videoService.getVideoDetail(Number(id));
  }

  @Get(':id/subtitle')
  getSubtitle(@Param('id') id: string) {
    return this.videoService.getSubtitle(Number(id));
  }
}
