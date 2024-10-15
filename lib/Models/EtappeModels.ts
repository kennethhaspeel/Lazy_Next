interface PostEtappeNieuwModel {
  missieid?: number;
  titel: string;
  omschrijving?: string | null;
  locatie?: string | null;
  startDatum: Date;
  kost: number;
  verschuldigDoor?: string[];
  betaler?: string;
  url?:string;
}

interface GetEtappeMetAantallen {
  id: number;
  missieid: number;
  titel: string;
  url?:string;
  omschrijving?: string | null;
  locatie?: string | null;
  startDatum: number;
  kost: number;
  aantalbijlages: number;
  aantalbewijsstukken: number;
}

interface EtappeDetail {
  id: number;
  titel: string;
  omschrijving?: string;
  locatie?: string;
  geom?: string;
  startDatum: number;
  url?:string;
  kost: number;
  betaaldDoor?: string;
  kostenverdeling:string[]
}

