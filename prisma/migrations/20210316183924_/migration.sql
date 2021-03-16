-- AlterTable
CREATE SEQUENCE "approval_history_approval_history_id_seq";
ALTER TABLE "approval_history" ALTER COLUMN "approval_history_id" SET DEFAULT nextval('approval_history_approval_history_id_seq');
ALTER SEQUENCE "approval_history_approval_history_id_seq" OWNED BY "public"."approval_history"."approval_history_id";
