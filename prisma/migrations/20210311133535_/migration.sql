/*
  Warnings:

  - Added the required column `approval_document_id` to the `approval_history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "approval_history" ADD COLUMN     "approval_document_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "approval_history" ADD FOREIGN KEY ("approval_document_id") REFERENCES "document"("document_id") ON DELETE CASCADE ON UPDATE CASCADE;
