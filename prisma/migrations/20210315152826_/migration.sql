/*
  Warnings:

  - You are about to drop the `_documentTouser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_documentTouser" DROP CONSTRAINT "_documentTouser_A_fkey";

-- DropForeignKey
ALTER TABLE "_documentTouser" DROP CONSTRAINT "_documentTouser_B_fkey";

-- DropTable
DROP TABLE "_documentTouser";

-- CreateTable
CREATE TABLE "_involved_user" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_involved_user_AB_unique" ON "_involved_user"("A", "B");

-- CreateIndex
CREATE INDEX "_involved_user_B_index" ON "_involved_user"("B");

-- AddForeignKey
ALTER TABLE "_involved_user" ADD FOREIGN KEY ("A") REFERENCES "document"("document_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_involved_user" ADD FOREIGN KEY ("B") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
