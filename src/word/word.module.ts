import { Module } from '@nestjs/common';
import { WordController } from './word.controller';
import { WordService } from './word.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [WordController],
  providers: [WordService],
  imports: [PrismaModule],
})
export class WordModule {}
