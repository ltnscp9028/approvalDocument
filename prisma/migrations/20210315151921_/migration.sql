-- AlterTable
ALTER TABLE "approval_history" ADD COLUMN     "approval_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
