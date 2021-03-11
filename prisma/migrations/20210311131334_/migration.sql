/*
  Warnings:

  - Added the required column `document_content` to the `document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "document" ADD COLUMN     "document_content" JSONB NOT NULL;
