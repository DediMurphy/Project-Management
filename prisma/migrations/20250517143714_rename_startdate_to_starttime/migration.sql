/*
  Warnings:

  - You are about to drop the column `endDate` on the `WorkLog` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `WorkLog` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `WorkLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `WorkLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkLog" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;
