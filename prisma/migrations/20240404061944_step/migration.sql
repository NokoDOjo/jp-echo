/*
  Warnings:

  - The primary key for the `Step` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `step` on the `Step` table. All the data in the column will be lost.
  - You are about to drop the column `stepId` on the `Step` table. All the data in the column will be lost.
  - Added the required column `type` to the `Step` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Step" DROP CONSTRAINT "Step_pkey",
DROP COLUMN "step",
DROP COLUMN "stepId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "type" "StepType" NOT NULL,
ADD CONSTRAINT "Step_pkey" PRIMARY KEY ("id");
