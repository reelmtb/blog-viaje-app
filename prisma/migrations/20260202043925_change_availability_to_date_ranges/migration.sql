/*
  Warnings:

  - You are about to drop the column `date` on the `Availability` table. All the data in the column will be lost.
  - Added the required column `end_date` to the `Availability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `Availability` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Availability_participant_id_date_key";

-- AlterTable
ALTER TABLE "Availability" DROP COLUMN "date",
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL;
