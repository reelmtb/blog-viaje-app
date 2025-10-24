/*
  Warnings:

  - Made the column `starter_id` on table `Trip` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Trip" DROP CONSTRAINT "Trip_starter_id_fkey";

-- AlterTable
ALTER TABLE "Trip" ALTER COLUMN "starter_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_starter_id_fkey" FOREIGN KEY ("starter_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
