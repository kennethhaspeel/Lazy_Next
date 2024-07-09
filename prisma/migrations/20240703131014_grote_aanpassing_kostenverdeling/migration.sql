/*
  Warnings:

  - You are about to drop the `EtappeOnderdeel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EtappeOnderdeelBestand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `KostenVerdeling` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EtappeOnderdeel" DROP CONSTRAINT "EtappeOnderdeel_etappeId_fkey";

-- DropForeignKey
ALTER TABLE "EtappeOnderdeel" DROP CONSTRAINT "EtappeOnderdeel_userId_fkey";

-- DropForeignKey
ALTER TABLE "EtappeOnderdeelBestand" DROP CONSTRAINT "EtappeOnderdeelBestand_etappeOnderdeelId_fkey";

-- DropForeignKey
ALTER TABLE "EtappeOnderdeelBestand" DROP CONSTRAINT "EtappeOnderdeelBestand_userId_fkey";

-- DropForeignKey
ALTER TABLE "KostenVerdeling" DROP CONSTRAINT "KostenVerdeling_etappeOnderdeelId_fkey";

-- DropForeignKey
ALTER TABLE "KostenVerdeling" DROP CONSTRAINT "KostenVerdeling_userId_fkey";

-- AlterTable
ALTER TABLE "MissieEtappe" ADD COLUMN     "beginDatum" TEXT,
ADD COLUMN     "eindDatum" TEXT,
ADD COLUMN     "kost" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "EtappeOnderdeel";

-- DropTable
DROP TABLE "EtappeOnderdeelBestand";

-- DropTable
DROP TABLE "KostenVerdeling";

-- CreateTable
CREATE TABLE "KostVerdeling" (
    "id" SERIAL NOT NULL,
    "missieId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "bedrag" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "KostVerdeling_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MissieEtappe" ADD CONSTRAINT "MissieEtappe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KostVerdeling" ADD CONSTRAINT "KostVerdeling_missieId_fkey" FOREIGN KEY ("missieId") REFERENCES "Missie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KostVerdeling" ADD CONSTRAINT "KostVerdeling_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
