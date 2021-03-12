/*
  Warnings:

  - Added the required column `document_title` to the `document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `document_classification` to the `document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "document" ADD COLUMN     "document_title" TEXT NOT NULL,
ADD COLUMN     "document_classification" TEXT NOT NULL,
ALTER COLUMN "document_content" SET DATA TYPE TEXT;
