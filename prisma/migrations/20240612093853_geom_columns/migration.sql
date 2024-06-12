-- AlterTable
ALTER TABLE "Missie" ADD COLUMN     "afbeelding" VARCHAR(500),
ADD COLUMN     "geom" VARCHAR(2500);

-- AlterTable
ALTER TABLE "MissieEtappe" ADD COLUMN     "geom" VARCHAR(2500);
