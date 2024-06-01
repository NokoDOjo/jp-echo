/*
  Warnings:

  - Added the required column `timestampEnd` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestampStart` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "timestampEnd" INTEGER NOT NULL,
ADD COLUMN     "timestampStart" INTEGER NOT NULL;
