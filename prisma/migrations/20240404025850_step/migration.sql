-- CreateEnum
CREATE TYPE "StepType" AS ENUM ('VIDEO', 'QUIZ');

-- CreateEnum
CREATE TYPE "StepSubType" AS ENUM ('noSubtitle', 'practiceKeyword', 'jpKeyword', 'jpSubtitle', 'MCQ');

-- CreateTable
CREATE TABLE "Step" (
    "stepId" SERIAL NOT NULL,
    "videoId" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "step" "StepType" NOT NULL,
    "subType" "StepSubType" NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Step_pkey" PRIMARY KEY ("stepId")
);
