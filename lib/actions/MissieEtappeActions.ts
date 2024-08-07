"use server";

import { getUnixTime } from "date-fns";
import db from "../prisma";
import { GetUserById } from "./UserActions";
import { MissieEtappe, Prisma } from "@prisma/client";

export async function GetAllEtappes(missieid: number, sortOrder:string) {
  const result = await db.missieEtappe.findMany({
    where: {
      missieId: missieid,
    },
    orderBy: [
      {
        startDatum: sortOrder === 'asc' ? "asc":"desc",
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
      omschrijving: model.omschrijving ? model.omschrijving : "",
      locatie: model.locatie ? model.locatie : "",
      startDatum: getUnixTime(model.startDatum),
      eindDatum: getUnixTime(model.eindDatum),
      kost: new Prisma.Decimal(model.kost),
      userId: model.kost > 0 ? model.betaler : undefined,
    },
  });
  if (model.kost > 0 && model.verschuldigDoor) {
    let bedrag = Math.round((model.kost / model.verschuldigDoor?.length)*100)/100;
    model.verschuldigDoor.map(async (u) => {
      await db.kostVerdeling.create({
        data: {
          missieEtappeId: etappe.id,
          userId: u,
          bedrag: bedrag,
        },
      });
    });
  }

  return etappe.id;
}
