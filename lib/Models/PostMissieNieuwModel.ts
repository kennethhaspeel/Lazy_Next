interface PostMissieNieuwModel {
  id?: number;
  titel: string;
  omschrijving?: string | null;
  locatie?: string | null;
  startDatum: Date;
  eindDatum: Date;
  publiekZichtbaar: boolean;
  afbeelding?: string | null;
  deelnemer?: MissieDeelnemerModel;
}
