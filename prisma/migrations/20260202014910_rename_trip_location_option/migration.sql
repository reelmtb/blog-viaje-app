/*
  Warnings:

  - You are about to drop the `City` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ParticipantCity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TripLocationOption` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[trip_id,user_id,date]` on the table `Availability` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[trip_id,user_id]` on the table `TripParticipant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Availability" DROP CONSTRAINT "Availability_trip_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."ParticipantCity" DROP CONSTRAINT "ParticipantCity_city_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."ParticipantCity" DROP CONSTRAINT "ParticipantCity_participant_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."TripLocationOption" DROP CONSTRAINT "TripLocationOption_city_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."TripLocationOption" DROP CONSTRAINT "TripLocationOption_trip_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."TripParticipant" DROP CONSTRAINT "TripParticipant_trip_id_fkey";

-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "public"."City";

-- DropTable
DROP TABLE "public"."ParticipantCity";

-- DropTable
DROP TABLE "public"."TripLocationOption";

-- CreateTable
CREATE TABLE "Destination" (
    "destination_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT,

    CONSTRAINT "Destination_pkey" PRIMARY KEY ("destination_id")
);

-- CreateTable
CREATE TABLE "TripDestinationOption" (
    "id" TEXT NOT NULL,
    "trip_id" TEXT NOT NULL,
    "destination_id" TEXT NOT NULL,

    CONSTRAINT "TripDestinationOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipantDestination" (
    "id" TEXT NOT NULL,
    "participant_id" TEXT NOT NULL,
    "destination_id" TEXT NOT NULL,

    CONSTRAINT "ParticipantDestination_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TripDestinationOption_trip_id_destination_id_key" ON "TripDestinationOption"("trip_id", "destination_id");

-- CreateIndex
CREATE UNIQUE INDEX "ParticipantDestination_participant_id_destination_id_key" ON "ParticipantDestination"("participant_id", "destination_id");

-- CreateIndex
CREATE INDEX "Availability_trip_id_idx" ON "Availability"("trip_id");

-- CreateIndex
CREATE UNIQUE INDEX "Availability_trip_id_user_id_date_key" ON "Availability"("trip_id", "user_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "TripParticipant_trip_id_user_id_key" ON "TripParticipant"("trip_id", "user_id");

-- AddForeignKey
ALTER TABLE "TripDestinationOption" ADD CONSTRAINT "TripDestinationOption_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "Trip"("trip_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripDestinationOption" ADD CONSTRAINT "TripDestinationOption_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "Destination"("destination_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripParticipant" ADD CONSTRAINT "TripParticipant_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "Trip"("trip_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantDestination" ADD CONSTRAINT "ParticipantDestination_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "TripParticipant"("participant_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantDestination" ADD CONSTRAINT "ParticipantDestination_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "Destination"("destination_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "Trip"("trip_id") ON DELETE CASCADE ON UPDATE CASCADE;
