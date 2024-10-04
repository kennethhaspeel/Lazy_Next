interface PostEtappeNieuwModel {
  missieid: number;
  titel: string;
  omschrijving?: string | null;
  locatie?: string | null;
  startDatum: Date;
  kost: number;
  verschuldigDoor?: string[];
  betaler?: string;
}

interface GetEtappeMetAantallen {
  id: number;
  missieid: number;
  titel: string;
  omschrijving?: string | null;
  locatie?: string | null;
  startDatum: number;
  kost: number;
  aantalbijlages: number;
  aantalbewijsstukken: number;
}
