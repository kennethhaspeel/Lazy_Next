-- DropForeignKey
ALTER TABLE "FinTransactie" DROP CONSTRAINT "FinTransactie_missieId_fkey";

-- AlterTable
ALTER TABLE "FinTransactie" ALTER COLUMN "missieId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "FinTransactie" ADD CONSTRAINT "FinTransactie_missieId_fkey" FOREIGN KEY ("missieId") REFERENCES "Missie"("id") ON DELETE SET NULL ON UPDATE CASCADE;
