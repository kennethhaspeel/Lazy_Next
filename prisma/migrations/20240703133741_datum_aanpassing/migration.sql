/*
  Warnings:

  - You are about to drop the column `missieId` on the `KostVerdeling` table. All the data in the column will be lost.
  - You are about to drop the column `beginDatum` on the `MissieEtappe` table. All the data in the column will be lost.
  - You are about to drop the column `datumTijd` on the `MissieEtappe` table. All the data in the column will be lost.
  - You are about to drop the column `eindDatum` on the `MissieEtappe` table. All the data in the column will be lost.
  - Added the required column `missieEtappeId` to the `KostVerdeling` table without a default value. This is not possible if the table is not empty.
  - Added the required column `datum` to the `MissieEtappe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eindUur` to the `MissieEtappe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startUur` to the `MissieEtappe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "KostVerdeling" DROP CONSTRAINT "KostVerdeling_missieId_fkey";

-- AlterTable
ALTER TABLE "KostVerdeling" DROP COLUMN "missieId",
ADD COLUMN     "missieEtappeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Missie" ALTER COLUMN "startDatum" SET DATA TYPE DATE,
ALTER COLUMN "eindDatum" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "MissieEtappe" DROP COLUMN "beginDatum",
DROP COLUMN "datumTijd",
DROP COLUMN "eindDatum",
ADD COLUMN     "datum" DATE NOT NULL,
ADD COLUMN     "eindUur" TIME NOT NULL,
ADD COLUMN     "startUur" TIME NOT NULL;

-- AddForeignKey
ALTER TABLE "KostVerdeling" ADD CONSTRAINT "KostVerdeling_missieEtappeId_fkey" FOREIGN KEY ("missieEtappeId") REFERENCES "MissieEtappe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
