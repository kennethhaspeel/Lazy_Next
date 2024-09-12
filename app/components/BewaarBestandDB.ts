"use server";
import db from "@/lib/prisma";
import { UploadImage } from "./ImageHelper";

export async function UploadFoto(data: FormData) {
  const response = await UploadImage(data, []);
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
      id: model.missieid,
    },
    data: {
      afbeelding: model.bestandsnaam,
    },
  });
  return JSON.stringify(update);
}
