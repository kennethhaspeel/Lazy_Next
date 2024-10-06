"use server";

import db from "../prisma";

export async function GetEtappeDetails(etappeid: number) {
  const result = await db.missieEtappe.findUnique({
    where: {
      id: etappeid,
    },
    include: {
      KostenVerdeling: true,
    },
  });
  //if (result) {
    const data: EtappeDetail = {
      id: result!.id,
      titel: result!.titel,
      omschrijving: result!.omschrijving ? result!.omschrijving : undefined,
      locatie: result!.locatie ? result!.locatie : undefined,
      geom: result!.geom ? result!.geom : undefined,
      startDatum: result!.startDatum,
      kost: Number(result!.kost),
      betaaldDoor: result!.userId ? result!.userId : undefined,
      kostenverdeling: result!.KostenVerdeling.map((kost) => kost.userId),
    };
    return data;
  //}
}
