"use server";
import db from "@/lib/prisma";
import { UploadImage } from "./ImageHelper";

export async function UploadFoto(data: string, tags: string[],bestandsnaam:string) {
  const response = await UploadImage(data, tags,bestandsnaam);
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
  const response = await db.missieEtappeBestand.create({
    data: {
      missieEtappeId:Number(data.missieEtappeId),
      bestandsNaam:data.bestandsNaam,
      mime:data.mime,
      url:data.url,
      width:data.width,
      height:data.height,
      size:data.size,
      fileId:data.fileId,
      uploadDatum:data.uploadDatum,
      userId:data.userId,
      isBewijsstuk: data.isBewijsstuk.toString() === 'true'
    },
  });

  return response;
}
