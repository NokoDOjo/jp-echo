import { PartialType } from '@nestjs/swagger';
import { SubQuizInputDto } from './sub-quiz-input.dto';

export class UpdateSubQuizDto extends PartialType(SubQuizInputDto) {}
