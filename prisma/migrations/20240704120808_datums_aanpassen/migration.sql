/*
  Warnings:

  - You are about to drop the column `eindDatum` on the `Missie` table. All the data in the column will be lost.
  - You are about to drop the column `startDatum` on the `Missie` table. All the data in the column will be lost.
  - You are about to drop the column `datum` on the `MissieEtappe` table. All the data in the column will be lost.
  - You are about to drop the column `eindUur` on the `MissieEtappe` table. All the data in the column will be lost.
  - You are about to drop the column `startUur` on the `MissieEtappe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Missie" DROP COLUMN "eindDatum",
DROP COLUMN "startDatum";

-- AlterTable
ALTER TABLE "MissieEtappe" DROP COLUMN "datum",
DROP COLUMN "eindUur",
DROP COLUMN "startUur";
