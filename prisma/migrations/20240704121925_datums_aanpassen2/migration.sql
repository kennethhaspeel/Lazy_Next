/*
  Warnings:

  - The `datum` column on the `FinTransactie` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `datum` column on the `SpaarTransactie` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "FinTransactie" DROP COLUMN "datum",
ADD COLUMN     "datum" BIGINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Missie" ADD COLUMN     "eindDatum" BIGINT NOT NULL DEFAULT 0,
ADD COLUMN     "startDatum" BIGINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "MissieEtappe" ADD COLUMN     "eindDatum" BIGINT NOT NULL DEFAULT 0,
ADD COLUMN     "startDatum" BIGINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "SpaarTransactie" DROP COLUMN "datum",
ADD COLUMN     "datum" BIGINT NOT NULL DEFAULT 0;
