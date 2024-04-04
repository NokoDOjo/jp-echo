-- CreateTable
CREATE TABLE "Subtitle" (
    "subtitleId" SERIAL NOT NULL,
    "videoId" INTEGER NOT NULL,
    "s3Path" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subtitle_pkey" PRIMARY KEY ("subtitleId")
);

-- CreateIndex
CREATE INDEX "fk_subtitles_video_id" ON "Subtitle"("videoId");

-- AddForeignKey
ALTER TABLE "Subtitle" ADD CONSTRAINT "Subtitle_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("video_id") ON DELETE CASCADE ON UPDATE CASCADE;
