import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { StepModule } from './step/step.module';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import { QuizModule } from './quiz/quiz.module';
import { WordModule } from './word/word.module';

@Module({
  imports: [
    PrismaModule,
    VideoModule,
    StepModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    QuizModule,
    WordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
