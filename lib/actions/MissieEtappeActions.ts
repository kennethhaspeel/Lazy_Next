"use server";

import { getUnixTime } from "date-fns";
import db from "../prisma";

export async function GetAllEtappes(missieid: number) {
  const result = await db.missieEtappe.findMany({
    where: {
      missieId: missieid,
    },
    orderBy: [
      {
        startDatum: "desc",
      },
    ],
  });
  return result;
}

export async function PostNieuweEtappe(model: PostEtappeNieuwModel) {
  const etappe = await db.missieEtappe.create({
    data: {
      missieId: model.missieid,
      titel: model.titel,
      omschrijving: model.omschrijving,
      locatie: model.locatie,
      startDatum: getUnixTime(model.startDatum),
      eindDatum: getUnixTime(model.eindDatum),
      kost: model.kost,
    },
  });
  return etappe.id;
}
