/*
  Warnings:

  - Added the required column `approver_list` to the `document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "document" ADD COLUMN     "approver_list" JSONB NOT NULL;
