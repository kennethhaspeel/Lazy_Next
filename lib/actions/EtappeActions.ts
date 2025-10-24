"use server";

import { user } from "@nextui-org/react";
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
      url: result!.url ? result!.url : ""
    };
    return data;
  //}
}

export async function GetEtappeMetDetails(etappeid:number){
  const result = await db.missieEtappe.findUnique({
    where: {
      id: etappeid,
    },
    include: {
      KostenVerdeling: {
        include:{
          user:true
        }
      },
      betaaldDoor: true
    },
  });
  const data: EtappeDetail = {
    id: result!.id,
    titel: result!.titel,
    omschrijving: result!.omschrijving ? result!.omschrijving : undefined,
    locatie: result!.locatie ? result!.locatie : undefined,
    geom: result!.geom ? result!.geom : undefined,
    startDatum: result!.startDatum,
    kost: Number(result!.kost),
    betaaldDoor: result!.userId ? `${result!.betaaldDoor?.voornaam } ${result!.betaaldDoor?.naam }` : undefined,
    kostenverdeling: result!.KostenVerdeling.map((kost) =>`${kost.user.voornaam } ${kost.user.naam }`),
    url: result!.url ? result!.url : "",
  };
  return data;
}
