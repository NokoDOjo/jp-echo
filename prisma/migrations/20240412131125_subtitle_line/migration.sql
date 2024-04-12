/*
  Warnings:

  - Added the required column `lineIndex` to the `SubtitleLine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubtitleLine" ADD COLUMN     "lineIndex" INTEGER NOT NULL;
