
interface PostEtappeNieuwModel {
    missieid:number;
    titel: string;
    omschrijving?: string | null;
    locatie?: string | null;
    startDatum: Date;
    eindDatum: Date;
    kost: number;
    verschuldigDoor?: string[];
    betaler?:string;
  }