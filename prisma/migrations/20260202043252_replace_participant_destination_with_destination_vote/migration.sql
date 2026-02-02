/*
  Warnings:

  - You are about to drop the `ParticipantDestination` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."ParticipantDestination" DROP CONSTRAINT "ParticipantDestination_destination_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."ParticipantDestination" DROP CONSTRAINT "ParticipantDestination_participant_id_fkey";

-- DropTable
DROP TABLE "public"."ParticipantDestination";

-- CreateTable
CREATE TABLE "DestinationVote" (
    "id" TEXT NOT NULL,
    "participant_id" TEXT NOT NULL,
    "trip_destination_id" TEXT NOT NULL,

    CONSTRAINT "DestinationVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DestinationVote_trip_destination_id_idx" ON "DestinationVote"("trip_destination_id");

-- CreateIndex
CREATE UNIQUE INDEX "DestinationVote_participant_id_trip_destination_id_key" ON "DestinationVote"("participant_id", "trip_destination_id");

-- AddForeignKey
ALTER TABLE "DestinationVote" ADD CONSTRAINT "DestinationVote_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "TripParticipant"("participant_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DestinationVote" ADD CONSTRAINT "DestinationVote_trip_destination_id_fkey" FOREIGN KEY ("trip_destination_id") REFERENCES "TripDestinationOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;
