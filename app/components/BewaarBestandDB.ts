"use server";
import db from "@/lib/prisma";
import { UploadImage } from "./ImageHelper";

export async function UploadFoto(data: FormData, tags: string[]) {
  const response = await UploadImage(data, tags);
  return JSON.stringify(response);
}

interface UpdateMissieAfbeeldingModel {
  missieid: number;
  bestandsnaam: string;
}
export async function UpdateMissieAfbeeldingRecord(
  model: UpdateMissieAfbeeldingModel
) {
  const update = await db.missie.update({
    where: {
      id: Number(model.missieid),
    },
    data: {
      afbeelding: model.bestandsnaam,
    },
  });
  return JSON.stringify(update);
}

interface BewaarMissieBestandModel {
  missieEtappeId: number;
  bestandsNaam: string;
  mime: string;
  url: string;
  width: number;
  height: number;
  size: number;
  fileId: string;
  uploadDatum: number;
  userId: string;
  isBewijsstuk: boolean;
}

export async function BewaarMissieBestand(data: BewaarMissieBestandModel) {
  console.log(data)
  const response = await db.missieEtappeBestand.create({
    data: data,
  });
  
  console.log(response)
  return response;
}
