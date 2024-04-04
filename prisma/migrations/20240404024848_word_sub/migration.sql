-- CreateTable
CREATE TABLE "WordSubtitleRelation" (
    "wordId" INTEGER NOT NULL,
    "subtitleId" INTEGER NOT NULL,
    "timestampStart" INTEGER NOT NULL,
    "timestampEnd" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WordSubtitleRelation_pkey" PRIMARY KEY ("wordId","subtitleId")
);

-- AddForeignKey
ALTER TABLE "WordSubtitleRelation" ADD CONSTRAINT "WordSubtitleRelation_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordSubtitleRelation" ADD CONSTRAINT "WordSubtitleRelation_subtitleId_fkey" FOREIGN KEY ("subtitleId") REFERENCES "Subtitle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
