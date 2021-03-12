/*
  Warnings:

  - You are about to drop the column `approval_coument` on the `approval_history` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "approval_history" DROP COLUMN "approval_coument",
ADD COLUMN     "approval_comment" TEXT;
