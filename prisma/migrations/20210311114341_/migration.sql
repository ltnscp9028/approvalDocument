-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('DOING', 'APPROVAL', 'REJECT');

-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "document" (
    "document_id" SERIAL NOT NULL,
    "author_id" INTEGER NOT NULL,
    "next_approvar_id" INTEGER NOT NULL,
    "approval_status" "ApprovalStatus" NOT NULL DEFAULT E'DOING',

    PRIMARY KEY ("document_id")
);

-- CreateTable
CREATE TABLE "_documentTouser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user.email_unique" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_documentTouser_AB_unique" ON "_documentTouser"("A", "B");

-- CreateIndex
CREATE INDEX "_documentTouser_B_index" ON "_documentTouser"("B");

-- AddForeignKey
ALTER TABLE "document" ADD FOREIGN KEY ("author_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document" ADD FOREIGN KEY ("next_approvar_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_documentTouser" ADD FOREIGN KEY ("A") REFERENCES "document"("document_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_documentTouser" ADD FOREIGN KEY ("B") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
