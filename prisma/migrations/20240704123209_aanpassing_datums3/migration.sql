/*
  Warnings:

  - You are about to alter the column `datum` on the `FinTransactie` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `eindDatum` on the `Missie` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `startDatum` on the `Missie` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `eindDatum` on the `MissieEtappe` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `startDatum` on the `MissieEtappe` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The `uploadDatum` column on the `MissieEtappeBestand` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `datum` on the `SpaarTransactie` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "FinTransactie" ALTER COLUMN "datum" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Missie" ALTER COLUMN "eindDatum" SET DATA TYPE INTEGER,
ALTER COLUMN "startDatum" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "MissieEtappe" ALTER COLUMN "eindDatum" SET DATA TYPE INTEGER,
ALTER COLUMN "startDatum" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "MissieEtappeBestand" DROP COLUMN "uploadDatum",
ADD COLUMN     "uploadDatum" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "SpaarTransactie" ALTER COLUMN "datum" SET DATA TYPE INTEGER;
