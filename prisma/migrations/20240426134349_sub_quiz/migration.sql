/*
  Warnings:

  - Added the required column `timestampEnd` to the `SubQuiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestampStart` to the `SubQuiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubQuiz" ADD COLUMN     "timestampEnd" INTEGER NOT NULL,
ADD COLUMN     "timestampStart" INTEGER NOT NULL;
