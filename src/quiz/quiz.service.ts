import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateSubQuizDto } from './dto/update-sub-quiz.dto';

@Injectable()
export class QuizService {
  constructor(private prismaService: PrismaService) {}

  async updateQuiz(quizId: number, data: UpdateSubQuizDto) {
    return await this.prismaService.subQuiz.update({
      where: {
        id: quizId,
      },
      data,
    });
  }
}
