/*
  Warnings:

  - The `approver_list` column on the `document` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "document" ADD COLUMN     "is_approval_list" BOOLEAN[],
DROP COLUMN "approver_list",
ADD COLUMN     "approver_list" INTEGER[];
