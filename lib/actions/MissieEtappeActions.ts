"use server";

import { getUnixTime } from "date-fns";
import db from "../prisma";
import { GetUserById } from "./UserActions";
import { MissieEtappe, Prisma } from "@prisma/client";

export async function GetAllEtappes(missieid: number, sortOrder: string) {
  const result = await db.missieEtappe.findMany({
    where: {
      missieId: missieid,
    },
    orderBy: [
      {
        startDatum: sortOrder === "asc" ? "asc" : "desc",
      },
    ],
  });
  return result;
}
export async function GetAllEtappesMetBewijsstuk(
  missieid: number,
  sortOrder: string
) {
  const result: GetEtappeMetAantallen[] =
    await db.$queryRaw`select  * from public.v_etappes_met_aantallen where "missieId" = ${missieid} `;
  //console.log(result)
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
      kost: new Prisma.Decimal(model.kost),
      userId: model.kost > 0 ? model.betaler : undefined,
    },
  });
  if (model.kost > 0 && model.verschuldigDoor) {
    await db.kostVerdeling.create({
      data: {
        missieEtappeId: etappe.id,
        userId: model.betaler!,
        bedrag: model.kost * -1,
      },
    });

    let bedrag =
      Math.round((model.kost / model.verschuldigDoor?.length) * 100) / 100;
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
