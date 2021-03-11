/*
  Warnings:

  - You are about to drop the column `next_approvar_id` on the `document` table. All the data in the column will be lost.
  - Added the required column `next_approver_id` to the `document` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "document" DROP CONSTRAINT "document_next_approvar_id_fkey";

-- AlterTable
ALTER TABLE "document" DROP COLUMN "next_approvar_id",
ADD COLUMN     "next_approver_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "approval_history" (
    "approval_history_id" INTEGER NOT NULL,
    "is_approval" BOOLEAN NOT NULL,
    "approver_id" INTEGER NOT NULL,

    PRIMARY KEY ("approval_history_id")
);

-- AddForeignKey
ALTER TABLE "approval_history" ADD FOREIGN KEY ("approver_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document" ADD FOREIGN KEY ("next_approver_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
