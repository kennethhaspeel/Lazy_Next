/*
  Warnings:

  - You are about to drop the column `betaaldDoor` on the `EtappeOnderdeel` table. All the data in the column will be lost.
  - Added the required column `userId` to the `EtappeOnderdeel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EtappeOnderdeel" DROP COLUMN "betaaldDoor",
ADD COLUMN     "omschrijving" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "EtappeOnderdeel" ADD CONSTRAINT "EtappeOnderdeel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
