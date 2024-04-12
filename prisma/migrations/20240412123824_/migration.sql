/*
  Warnings:

  - A unique constraint covering the columns `[videoId]` on the table `Subtitle` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Subtitle_videoId_key" ON "Subtitle"("videoId");
