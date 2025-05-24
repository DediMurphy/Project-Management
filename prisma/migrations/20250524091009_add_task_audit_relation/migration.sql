/*
  Warnings:

  - Changed the type of `createdBy` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `updateBy` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "createdBy",
ADD COLUMN     "createdBy" INTEGER NOT NULL,
DROP COLUMN "updateBy",
ADD COLUMN     "updateBy" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_updateBy_fkey" FOREIGN KEY ("updateBy") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
