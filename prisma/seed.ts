import { PrismaClient, StepSubType, StepType } from '@prisma/client';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import * as util from 'util';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const wordData = [
  {
    japanese: 'すみません',
    chinese: '不好意思',
    subtitleLineId: 53,
  },
  {
    japanese: '何名様ですか',
    chinese: '請問幾位',
    subtitleLineId: 51,
  },
  {
    japanese: '大丈夫',
    chinese: '沒問題',
    subtitleLineId: 55,
  },
  {
    japanese: 'お願いします',
    chinese: '拜託',
    subtitleLineId: 53,
  },
  {
    japanese: '大変お待たせしました',
    chinese: '讓您久等了',
    subtitleLineId: 102,
  },
  {
    japanese: 'お会計',
    chinese: '結帳',
    subtitleLineId: 118,
  },
  {
    japanese: 'かしこまりました',
    chinese: '我瞭解了',
    subtitleLineId: 54,
  },
  {
    japanese: '注文',
    chinese: '點餐',
    subtitleLineId: 53,
  },
  {
    japanese: '少々お待ちください',
    chinese: '請稍等我一下',
    subtitleLineId: 62,
  },
  {
    japanese: 'お願いします',
    chinese: '準備好為您服務',
    subtitleLineId: 84,
  },
];

const stepsData = [
  {
    type: StepType.VIDEO,
    subType: StepSubType.noSubtitle,
    order: 1,
    title: '無字幕',
  },
  {
    type: StepType.VIDEO,
    subType: StepSubType.practiceKeyword,
    order: 2,
    title: '練習重點關鍵字',
  },
  {
    type: StepType.VIDEO,
    subType: StepSubType.jpKeyword,
    order: 3,
    title: '日文關鍵字',
  },
  {
    type: StepType.VIDEO,
    subType: StepSubType.jpSubtitle,
    order: 4,
    title: '日文字幕',
  },
  {
    type: StepType.VIDEO,
    subType: StepSubType.noSubtitle,
    order: 5,
    title: '無字幕',
  },
  {
    type: StepType.QUIZ,
    subType: StepSubType.MCQ,
    order: 6,
    title: '試題測驗',
  },
  {
    type: StepType.QUIZ,
    subType: StepSubType.MCQ,
    order: 7,
    title: '試題測驗',
  },
  {
    type: StepType.COMPLETE,
    subType: StepSubType.noSubtitle,
    order: 8,
    title: '完成測驗',
  },
];

const firstSubquizList = [
  {
    id: 1,
    quizId: 1,
    description: '請問點餐的人說了什麼',
    choice: [
      { id: 1, content: 'すみません', isCorrect: true },
      { id: 2, content: '大丈夫', isCorrect: false },
      { id: 3, content: 'お願いします', isCorrect: false },
    ],
    timestampStart: 330000,
    timestampEnd: 332000,
  },
  {
    id: 2,
    quizId: 1,
    description: '請問點餐的人說了什麼',
    choice: [
      { id: 1, content: '英語のメニューありますか?', isCorrect: false },
      { id: 2, content: '注文をお願いします。', isCorrect: true },
      { id: 3, content: 'これ、お願いします。', isCorrect: false },
    ],
    timestampStart: 340000,
    timestampEnd: 342000,
  },
  {
    id: 3,
    quizId: 1,
    description: '請問服務生說了什麼',
    choice: [
      { id: 1, content: 'はい、少々お待ちください。', isCorrect: false },
      { id: 2, content: 'おかい計をお願いします', isCorrect: false },
      { id: 3, content: 'はい、かしこまりました。', isCorrect: true },
    ],
    timestampStart: 385000,
    timestampEnd: 387000,
  },
];

const secondSubquizList = [
  {
    id: 4,
    quizId: 2,
    description: '請問服務生說了甚麼',
    choice: [
      {
        id: 1,
        content: 'ありがとうございました、以上でよろしいですか？',
        isCorrect: false,
      },
      {
        id: 2,
        content: 'かしこまりました、以上でよろしいですか？',
        isCorrect: true,
      },
      {
        id: 3,
        content: '大丈夫です、以上でよろしいですか？',
        isCorrect: false,
      },
    ],
    timestampStart: 111000,
    timestampEnd: 112000,
  },
  {
    id: 5,
    quizId: 2,
    description: '請選出影片中的會話內容',
    choice: [
      { id: 1, content: '少々お待ちください?', isCorrect: false },
      { id: 2, content: 'これを注文しました', isCorrect: true },
      { id: 3, content: '何名様ですか', isCorrect: false },
    ],
    timestampStart: 143000,
    timestampEnd: 146000,
  },
  {
    id: 6,
    quizId: 2,
    description: '請問服務生說了什麼',
    choice: [
      {
        id: 1,
        content: '失礼いたします。おまたせいたしました',
        isCorrect: true,
      },
      { id: 2, content: '失礼いたします。お伺いします', isCorrect: false },
      {
        id: 3,
        content: '失礼いたします。少々お待ちください。',
        isCorrect: false,
      },
    ],
    timestampStart: 172000,
    timestampEnd: 174000,
  },
];

async function main() {
  const readFile = util.promisify(fs.readFile);
  const data = await readFile('src/common/srt/test.srt', 'utf8');
  const entries = data.split(/\r?\n\r?\n/);
  const userId = randomUUID();
  const password = bcrypt.hashSync('Root12345678', 10);
  const user = await prisma.user.upsert({
    where: { email: 'root@example.com' },
    update: {},
    create: {
      id: userId,
      email: 'root@example.com',
      password,
      role: 'ADMIN',
    },
  });

  const video1 = await prisma.video.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      userId: user.id,
      title: '日文點餐',
      url: 'https://www.youtube.com/watch?v=vd6mwUSiS40',
    },
  });

  const video2 = await prisma.video.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      userId: user.id,
      title: '日文點餐',
      url: 'https://youtu.be/ZTMsWymcNVA',
    },
  });

  const quiz1 = await prisma.quiz.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      videoId: 1,
      stepId: 6,
    },
  });

  for (const subQuiz of firstSubquizList) {
    await prisma.subQuiz.upsert({
      where: { id: subQuiz.id },
      update: {},
      create: subQuiz,
    });
  }

  const quiz2 = await prisma.quiz.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      videoId: 1,
      stepId: 7,
      videoUrl: 'https://youtu.be/ZTMsWymcNVA',
    },
  });

  for (const subQuiz of secondSubquizList) {
    await prisma.subQuiz.upsert({
      where: { id: subQuiz.id },
      update: {},
      create: subQuiz,
    });
  }

  const subtitle = await prisma.subtitle.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      videoId: 1,
    },
  });

  for (const entry of entries) {
    const lines = entry.split(/\r?\n/);
    if (lines.length >= 3) {
      const index = parseInt(lines[0], 10);
      const times = lines[1].split(' --> ');
      const timestampStart = convertTimeToMs(times[0]);
      const timestampEnd = convertTimeToMs(times[1]);
      const line = lines.slice(2).join('\\n');
      await prisma.subtitleLine.upsert({
        where: { id: index },
        update: {},
        create: {
          id: index,
          subtitleId: subtitle.id,
          lineIndex: index,
          timestampStart,
          timestampEnd,
          line,
        },
      });
    }
  }

  for (let i = 1; i <= wordData.length; i++) {
    await prisma.word.upsert({
      where: { id: i },
      update: {},
      create: {
        id: i,
        japanese: wordData[i - 1].japanese,
        chinese: wordData[i - 1].chinese,
        subtitleLineId: wordData[i - 1].subtitleLineId,
      },
    });
  }

  for (let i = 1; i <= stepsData.length; i++) {
    const step = await prisma.step.upsert({
      where: { id: i },
      update: {},
      create: {
        id: i,
        ...stepsData[i - 1],
        videoId: 1,
      },
    });
  }
}

function convertTimeToMs(timeStr: string): number {
  const [hours, minutes, secondsMs] = timeStr.split(':');
  const [seconds, milliseconds] = secondsMs.split(',');
  return (
    parseInt(hours, 10) * 3600000 +
    parseInt(minutes, 10) * 60000 +
    parseInt(seconds, 10) * 1000 +
    parseInt(milliseconds, 10)
  );
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
