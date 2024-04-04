import { PrismaClient, StepSubType, StepType } from '@prisma/client';

const prisma = new PrismaClient();

const wordData = [
  {
    japanese: 'すみません',
    chinese: '不好意思',
    timeStampStart: 999,
    timeStampEnd: 2050,
  },
  {
    japanese: '何名様ですか',
    chinese: '請問幾位',
    timeStampStart: 2050,
    timeStampEnd: 4195,
  },
  {
    japanese: '大丈夫',
    chinese: '沒問題',
    timeStampStart: 38444,
    timeStampEnd: 47069,
  },
  {
    japanese: 'お願いします',
    chinese: '拜託',
    timeStampStart: 62385,
    timeStampEnd: 69979,
  },
  {
    japanese: '大変お待たせしました',
    chinese: '讓您久等了',
    timeStampStart: 367655,
    timeStampEnd: 370830,
  },
  {
    japanese: 'お会計',
    chinese: '結帳',
    timeStampStart: 110609,
    timeStampEnd: 118329,
  },
  {
    japanese: 'かしこまりました',
    chinese: '我瞭解了',
    timeStampStart: 352495,
    timeStampEnd: 358660,
  },
  {
    japanese: '注文',
    chinese: '點餐',
    timeStampStart: 90990,
    timeStampEnd: 101069,
  },
  {
    japanese: '少々お待ちください',
    chinese: '請稍等我一下',
    timeStampStart: 401802,
    timeStampEnd: 411461,
  },
  {
    japanese: 'お願いします',
    chinese: '準備好為您服務',
    timeStampStart: 110609,
    timeStampEnd: 118329,
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

async function main() {
  const video = await prisma.video.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: '日文點餐',
      url: 'https://www.youtube.com/watch?v=vd6mwUSiS40',
    },
  });

  const quiz = await prisma.quiz.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      description: '請問點餐的人說了什麼?',
      choice: {
        options: [
          { id: 1, content: 'すみません', isCorrect: true },
          { id: 2, content: '大丈夫', isCorrect: false },
          { id: 3, content: 'お願いします', isCorrect: false },
        ],
      },
      videoId: 1,
    },
  });

  const subtitle = await prisma.subtitle.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      videoId: 1,
    },
  });

  for (let i = 1; i <= wordData.length; i++) {
    await prisma.word.upsert({
      where: { id: i },
      update: {},
      create: {
        id: i,
        japanese: wordData[i - 1].japanese,
        chinese: wordData[i - 1].chinese,
      },
    });

    await prisma.wordSubtitle.upsert({
      where: {
        wordId_subtitleId: {
          wordId: i,
          subtitleId: 1,
        },
      },
      create: {
        wordId: i,
        subtitleId: 1,
        timestampStart: wordData[i - 1].timeStampStart,
        timestampEnd: wordData[i - 1].timeStampEnd,
      },
      update: {},
    });
  }

  for (let i = 1; i <= stepsData.length; i++) {
    const step =await prisma.step.upsert({
      where: { id: i },
      update: {},
      create: {
        id: i,
        ...stepsData[i - 1],
        videoId: 1,
      },
    });
    console.log(step)
  }
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
