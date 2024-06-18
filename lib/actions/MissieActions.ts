"use server";

import db from "../prisma";
import { GetDatumAlgemeen } from "@/app/components/DatumHelper";

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
      startDatum: missie.startDatum,
      eindDatum: missie.eindDatum,
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
    startDatum: result!.startDatum,
    eindDatum: result!.eindDatum,
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
      startDatum: data.startDatum,
      eindDatum: data.eindDatum,
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
  const etappe = await db.missieEtappe.create({
    data: {
      titel: "Algemeen",
      datumTijd: GetDatumAlgemeen(data.startDatum),
      missieId: missie.id,
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
      startDatum: model.startDatum,
      eindDatum: model.eindDatum,
      publiekZichtbaar: model.publiekZichtbaar,
    },
  });
}
