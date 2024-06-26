interface MissieDeelnemersModel {
    id: string;
    naam: string;
    deelnemer: boolean;
    organisator: boolean;
  }
  interface UpdateMissieDeelnemerModel {
    deelnemers: MissieDeelnemersModel[];
    missieid: number
    }