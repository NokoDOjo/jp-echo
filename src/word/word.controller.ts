import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { UpdateWordDto } from './dto/update-word.dto';
import { WordService } from './word.service';

@Controller('word')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateWord(@Param('id') id: number, @Body() data: UpdateWordDto) {
    return await this.wordService.updateWord(Number(id), data);
  }
}
