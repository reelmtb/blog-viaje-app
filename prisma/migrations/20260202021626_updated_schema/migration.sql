/*
  Warnings:

  - You are about to drop the column `trip_id` on the `Availability` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Availability` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[participant_id,date]` on the table `Availability` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `participant_id` to the `Availability` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Availability" DROP CONSTRAINT "Availability_trip_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Availability" DROP CONSTRAINT "Availability_user_id_fkey";

-- DropIndex
DROP INDEX "public"."Availability_trip_id_idx";

-- DropIndex
DROP INDEX "public"."Availability_trip_id_user_id_date_key";

-- AlterTable
ALTER TABLE "Availability" DROP COLUMN "trip_id",
DROP COLUMN "user_id",
ADD COLUMN     "participant_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ParticipantDestination" ADD COLUMN     "rank" INTEGER;

-- CreateIndex
CREATE INDEX "Availability_participant_id_idx" ON "Availability"("participant_id");

-- CreateIndex
CREATE UNIQUE INDEX "Availability_participant_id_date_key" ON "Availability"("participant_id", "date");

-- CreateIndex
CREATE INDEX "ParticipantDestination_participant_id_rank_idx" ON "ParticipantDestination"("participant_id", "rank");

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "TripParticipant"("participant_id") ON DELETE CASCADE ON UPDATE CASCADE;
