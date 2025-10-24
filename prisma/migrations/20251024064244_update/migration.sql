-- DropForeignKey
ALTER TABLE "public"."Trip" DROP CONSTRAINT "Trip_starter_id_fkey";

-- AlterTable
ALTER TABLE "Trip" ALTER COLUMN "starter_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_starter_id_fkey" FOREIGN KEY ("starter_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
