interface MissieModel {
  id: number;
  titel: string;
  omschrijving?: string | null;
  locatie?: string | null;
  startDatum: Date;
  eindDatum: Date;
  publiekZichtbaar: boolean;
  afgesloten: boolean;
  afbeelding?: string | null;
  deelnemers: MissieDeelnemerModel[];
}

interface MissieDeelnemerModel {
  id: string;
  naam: string;
  isOrganisator: boolean;
}

interface GetMissieKost {
  userId: string;
  naam: string;
  bedrag: string;
}

interface MissiekostenPerDeelnemer {
  userid: string;
  naam: string;
  bedrag: number;
}