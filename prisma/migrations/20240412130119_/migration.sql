/*
  Warnings:

  - You are about to drop the `WordSubtitle` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[subtitleLineId]` on the table `Word` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "WordSubtitle" DROP CONSTRAINT "WordSubtitle_subtitleId_fkey";

-- DropForeignKey
ALTER TABLE "WordSubtitle" DROP CONSTRAINT "WordSubtitle_wordId_fkey";

-- AlterTable
ALTER TABLE "Word" ADD COLUMN     "subtitleLineId" INTEGER;

-- DropTable
DROP TABLE "WordSubtitle";

-- CreateTable
CREATE TABLE "SubtitleLine" (
    "id" SERIAL NOT NULL,
    "subtitleId" INTEGER NOT NULL,
    "line" TEXT NOT NULL,
    "timestampStart" INTEGER NOT NULL,
    "timestampEnd" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubtitleLine_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "fk_subtitle_lines_subtitle_id" ON "SubtitleLine"("subtitleId");

-- CreateIndex
CREATE UNIQUE INDEX "Word_subtitleLineId_key" ON "Word"("subtitleLineId");

-- AddForeignKey
ALTER TABLE "SubtitleLine" ADD CONSTRAINT "SubtitleLine_subtitleId_fkey" FOREIGN KEY ("subtitleId") REFERENCES "Subtitle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_subtitleLineId_fkey" FOREIGN KEY ("subtitleLineId") REFERENCES "SubtitleLine"("id") ON DELETE SET NULL ON UPDATE CASCADE;
