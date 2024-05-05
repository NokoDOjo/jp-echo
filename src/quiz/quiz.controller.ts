import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { UpdateSubQuizDto } from './dto/update-sub-quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  // Edit sub quiz
  @Put('/sub/:id')
  @HttpCode(HttpStatus.OK)
  async updateSubQuiz(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateSubQuizDto,
  ) {
    return await this.quizService.updateQuiz(id, data);
  }
}
