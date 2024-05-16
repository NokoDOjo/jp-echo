import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateWordDto } from './dto/update-word.dto';

@Injectable()
export class WordService {
  constructor(private prismaService: PrismaService) {}

  async updateWord(wordId: number, data: UpdateWordDto) {
    return await this.prismaService.word.update({
      where: {
        id: wordId,
      },
      data,
    });
  }
}
