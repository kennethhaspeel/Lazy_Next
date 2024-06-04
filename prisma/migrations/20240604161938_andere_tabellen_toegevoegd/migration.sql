-- CreateTable
CREATE TABLE "UserRoles" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "rolId" INTEGER NOT NULL,

    CONSTRAINT "UserRoles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "rolnaam" VARCHAR(100) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Missie" (
    "id" SERIAL NOT NULL,
    "titel" VARCHAR(100) NOT NULL,
    "omschrijving" VARCHAR(1000),
    "locatie" VARCHAR(100),
    "startDatum" TIMESTAMP(3) NOT NULL,
    "eindDatum" TIMESTAMP(3) NOT NULL,
    "publiekZichtbaar" BOOLEAN NOT NULL DEFAULT false,
    "afgsloten" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Missie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MissieUser" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "missieId" INTEGER NOT NULL,
    "isOrganisator" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "MissieUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MissieEtappe" (
    "id" SERIAL NOT NULL,
    "missieId" INTEGER NOT NULL,
    "titel" VARCHAR(100) NOT NULL,
    "omschrijving" VARCHAR(1000),
    "locatie" VARCHAR(100),
    "datumTijd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MissieEtappe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MissieEtappeBestand" (
    "id" SERIAL NOT NULL,
    "missieEtappeId" INTEGER NOT NULL,
    "bestandsNaam" VARCHAR(500) NOT NULL,
    "mime" VARCHAR(500) NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "size" BIGINT NOT NULL,
    "fileId" VARCHAR(100) NOT NULL,
    "uploadDatum" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "MissieEtappeBestand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EtappeOnderdeel" (
    "id" SERIAL NOT NULL,
    "etappeId" INTEGER NOT NULL,
    "kost" DECIMAL(65,30) NOT NULL,
    "betaaldDoor" TEXT NOT NULL,

    CONSTRAINT "EtappeOnderdeel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EtappeOnderdeelBestand" (
    "id" SERIAL NOT NULL,
    "etappeOnderdeelId" INTEGER NOT NULL,
    "bestandsNaam" VARCHAR(500) NOT NULL,
    "mime" VARCHAR(500) NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "size" BIGINT NOT NULL,
    "fileId" VARCHAR(100) NOT NULL,
    "uploadDatum" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "EtappeOnderdeelBestand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KostenVerdeling" (
    "id" SERIAL NOT NULL,
    "etappeOnderdeelId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "bedrag" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "KostenVerdeling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinTransactie" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "missieId" INTEGER NOT NULL,
    "datum" TIMESTAMP(3) NOT NULL,
    "bedrag" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "mededeling" TEXT,

    CONSTRAINT "FinTransactie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpaarTransactie" (
    "id" SERIAL NOT NULL,
    "datum" TIMESTAMP(3) NOT NULL,
    "bedrag" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "mededeling" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SpaarTransactie_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserRoles" ADD CONSTRAINT "UserRoles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRoles" ADD CONSTRAINT "UserRoles_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MissieUser" ADD CONSTRAINT "MissieUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MissieUser" ADD CONSTRAINT "MissieUser_missieId_fkey" FOREIGN KEY ("missieId") REFERENCES "Missie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MissieEtappe" ADD CONSTRAINT "MissieEtappe_missieId_fkey" FOREIGN KEY ("missieId") REFERENCES "Missie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MissieEtappeBestand" ADD CONSTRAINT "MissieEtappeBestand_missieEtappeId_fkey" FOREIGN KEY ("missieEtappeId") REFERENCES "MissieEtappe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MissieEtappeBestand" ADD CONSTRAINT "MissieEtappeBestand_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtappeOnderdeel" ADD CONSTRAINT "EtappeOnderdeel_etappeId_fkey" FOREIGN KEY ("etappeId") REFERENCES "MissieEtappe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtappeOnderdeelBestand" ADD CONSTRAINT "EtappeOnderdeelBestand_etappeOnderdeelId_fkey" FOREIGN KEY ("etappeOnderdeelId") REFERENCES "EtappeOnderdeel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtappeOnderdeelBestand" ADD CONSTRAINT "EtappeOnderdeelBestand_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KostenVerdeling" ADD CONSTRAINT "KostenVerdeling_etappeOnderdeelId_fkey" FOREIGN KEY ("etappeOnderdeelId") REFERENCES "EtappeOnderdeel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KostenVerdeling" ADD CONSTRAINT "KostenVerdeling_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinTransactie" ADD CONSTRAINT "FinTransactie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinTransactie" ADD CONSTRAINT "FinTransactie_missieId_fkey" FOREIGN KEY ("missieId") REFERENCES "Missie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpaarTransactie" ADD CONSTRAINT "SpaarTransactie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
