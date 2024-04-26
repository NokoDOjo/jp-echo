/*
  Warnings:

  - You are about to drop the column `choice` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Quiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "choice",
DROP COLUMN "description";

-- CreateTable
CREATE TABLE "SubQuiz" (
    "id" SERIAL NOT NULL,
    "quizId" INTEGER NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "choice" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubQuiz_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "fk_sub_quizzes_quiz_id" ON "SubQuiz"("quizId");

-- AddForeignKey
ALTER TABLE "SubQuiz" ADD CONSTRAINT "SubQuiz_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;
