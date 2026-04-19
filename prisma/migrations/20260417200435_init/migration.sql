/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Trip` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Destination" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Trip_code_key" ON "Trip"("code");
