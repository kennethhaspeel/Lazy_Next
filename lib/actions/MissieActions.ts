"use server";

import { MissieUser } from "@prisma/client";
import db from "../prisma";
import { GetDatumAlgemeen } from "@/app/components/DatumHelper";
import { getUnixTime,fromUnixTime } from "date-fns"

export async function GetAllMissions() {
  const result = await db.missie.findMany({
    orderBy: [
      {
        startDatum: "desc",
      },
    ],
    include: {
      MissieUser: {
        include: {
          user: {
            select: {
              naam: true,
              voornaam: true,
            },
          },
        },
      },
    },
  });
  let MissieLijst: MissieModel[] = [];
  result.map((missie) => {
    let MissieDeelnemers: MissieDeelnemerModel[] = [];
    missie.MissieUser.map((deelnemer) => {
      MissieDeelnemers.push({
        id: deelnemer.userId,
        naam: `${deelnemer.user.voornaam} ${deelnemer.user.naam}`,
        isOrganisator: deelnemer.isOrganisator,
      });
    });
    MissieLijst.push({
      id: missie.id,
      titel: missie.titel,
      omschrijving: missie.omschrijving ? missie.omschrijving : "",
      locatie: missie.locatie ? missie.locatie : "",
      afbeelding: missie.afbeelding,
      startDatum: new Date(fromUnixTime(missie.startDatum)),
      eindDatum: new Date(fromUnixTime(missie.eindDatum)),
      publiekZichtbaar: missie.publiekZichtbaar,
      afgesloten: missie.afgsloten,
      deelnemers: MissieDeelnemers,
    });
  });
  return MissieLijst;
}

export async function GetMission(id: number) {
  const result = await db.missie.findUnique({
    where: {
      id: id,
    },
    include: {
      MissieUser: {
        include: {
          user: {
            select: {
              naam: true,
              voornaam: true,
            },
          },
        },
      },
    },
  });

  let MissieDeelnemers: MissieDeelnemerModel[] = [];
  result!.MissieUser.map((deelnemer) => {
    MissieDeelnemers.push({
      id: deelnemer.userId,
      naam: `${deelnemer.user.voornaam} ${deelnemer.user.naam}`,
      isOrganisator: deelnemer.isOrganisator,
    });
  });

  const Missie: MissieModel = {
    id: result!.id,
    titel: result!.titel,
    omschrijving: result?.omschrijving ? result.omschrijving : "",
    locatie: result!.locatie ? result!.locatie : "",
    afbeelding: result!.afbeelding,
    startDatum: fromUnixTime(result!.startDatum),
    eindDatum: fromUnixTime(result!.eindDatum),
    publiekZichtbaar: result!.publiekZichtbaar,
    afgesloten: result!.afgsloten,
    deelnemers: MissieDeelnemers,
  };
  return Missie;
}

export async function PostMissieNieuw(data: PostMissieNieuwModel) {
  const missie = await db.missie.create({
    data: {
      titel: data.titel,
      omschrijving: data.omschrijving,
      locatie: data.locatie,
      startDatum: getUnixTime(data.startDatum),
      eindDatum: getUnixTime(data.eindDatum),
      publiekZichtbaar: false,
    },
  });

  const user = await db.missieUser.create({
    data: {
      missieId: missie.id,
      userId: data.deelnemer!.id,
      isOrganisator: true,
    },
  });

  return missie.id;
}
export async function UpdateMissie(model: PostMissieNieuwModel) {
  const update = await db.missie.update({
    where: {
      id: model.id,
    },
    data: {
      titel: model.titel,
      omschrijving: model.omschrijving,
      locatie: model.locatie,
      startDatum: getUnixTime(model.startDatum),
      eindDatum: getUnixTime(model.eindDatum),
      publiekZichtbaar: model.publiekZichtbaar,
    },
  });
}

export async function UpdateMissieDeelnemers(
  model: UpdateMissieDeelnemerModel
) {
  const deleteMissieDeelnemers = await db.missieUser.deleteMany({
    where: {
      missieId: model.missieid,
    },
  });

  const m = model.deelnemers
    .filter((x) => x.deelnemer)
    .map((deel) => ({
      missieId: model.missieid,
      userId: deel.id,
      isOrganisator: deel.organisator,
    }));

  const updateDeelnemers = await db.missieUser.createMany({
    data: m,
  });
  return model;
}

