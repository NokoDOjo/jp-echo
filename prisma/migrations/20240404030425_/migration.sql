/*
  Warnings:

  - You are about to drop the `WordSubtitleRelation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WordSubtitleRelation" DROP CONSTRAINT "WordSubtitleRelation_subtitleId_fkey";

-- DropForeignKey
ALTER TABLE "WordSubtitleRelation" DROP CONSTRAINT "WordSubtitleRelation_wordId_fkey";

-- DropTable
DROP TABLE "WordSubtitleRelation";

-- CreateTable
CREATE TABLE "WordSubtitle" (
    "wordId" INTEGER NOT NULL,
    "subtitleId" INTEGER NOT NULL,
    "timestampStart" INTEGER NOT NULL,
    "timestampEnd" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WordSubtitle_pkey" PRIMARY KEY ("wordId","subtitleId")
);

-- AddForeignKey
ALTER TABLE "WordSubtitle" ADD CONSTRAINT "WordSubtitle_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordSubtitle" ADD CONSTRAINT "WordSubtitle_subtitleId_fkey" FOREIGN KEY ("subtitleId") REFERENCES "Subtitle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
