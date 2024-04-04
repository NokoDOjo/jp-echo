/*
  Warnings:

  - The primary key for the `Subtitle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `subtitleId` on the `Subtitle` table. All the data in the column will be lost.
  - The primary key for the `Video` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `video_id` on the `Video` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subtitle" DROP CONSTRAINT "Subtitle_videoId_fkey";

-- AlterTable
ALTER TABLE "Subtitle" DROP CONSTRAINT "Subtitle_pkey",
DROP COLUMN "subtitleId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Subtitle_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Video" DROP CONSTRAINT "Video_pkey",
DROP COLUMN "video_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Video_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "japanese" VARCHAR(255) NOT NULL,
    "chinese" VARCHAR(255) NOT NULL,
    "jlptLevel" SMALLINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subtitle" ADD CONSTRAINT "Subtitle_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;
