/*
  Warnings:

  - You are about to drop the column `missieId` on the `FinTransactie` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "FinTransactie" DROP CONSTRAINT "FinTransactie_missieId_fkey";

-- AlterTable
ALTER TABLE "FinTransactie" DROP COLUMN "missieId";
