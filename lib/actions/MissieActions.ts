"use server";

import { Prisma } from "@prisma/client";
import db from "../prisma";
import { getUnixTime, fromUnixTime } from "date-fns";
import { unescape } from "querystring";

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

export async function GetMissiekostenPerDeelnemer(missieid: number) {
  const result = await db.missie.findUnique({
    where: {
      id: missieid,
    },
    include: {
      MissieEtappe: {
        include: {
          KostenVerdeling: true,
        },
      },
      MissieUser: {
        include: {
          user: true,
        },
      },
    },
  });
  let lijst: MissiekostenPerDeelnemer[] = [];
  if (result) {
    for (const u of result.MissieUser) {
      lijst.push({
        userid: u.userId,
        naam: `${u.user.voornaam} ${u.user.naam}`,
        bedrag: 0,
      });
    }
    let rekening: number = 0;
    for (const u of lijst) {
      result.MissieEtappe.forEach((rij) => {
        if (rij.userId === u.userid) {
          u.bedrag += Number(rij.kost);
        } 
        rij.KostenVerdeling.forEach((kost) => {
          if (kost.userId === u.userid) {
            u.bedrag += Number(kost.bedrag);
          }
        });
      });
    }
    result.MissieEtappe.forEach((rij) => {
      if (rij.userId === "clxucmprp0002p31rf6p6mux3") {
        rekening += Number(rij.kost);
      }
    })
    lijst.push({
      userid: "clxucmprp0002p31rf6p6mux3",
      naam: "Rekening",
      bedrag: rekening,
    });
  }

  return lijst;
}

// export async function GetMissieKosten(missieid: Number) {
//   const result: GetMissieKost[] =
//     await db.$queryRaw`select kost."userId",kost.bedrag::text,concat(deelnemer.voornaam,' ',deelnemer.naam) naam from
// (select  "userId",round(sum(bedrag),2) bedrag from public."KostVerdeling" where "KostVerdeling"."missieEtappeId" in (select  id from public."MissieEtappe" where "missieId" = ${missieid}) group by "userId") kost
// inner JOIN
// (select id, naam,voornaam from public."User" ) deelnemer
// on kost."userId" = deelnemer.id`;
//   return result;
// }

interface PostMissieKostVerdelingModel {
  kosten: MissiekostenPerDeelnemer[];
  missieid: number;
  missienaam: string;
}

interface PostMissieKostenArr {
  bedrag: Prisma.Decimal;
  userId: string;
  datum: number;
  mededeling: string;
}

export async function PostMissieKosten({
  kosten,
  missieid,
  missienaam,
}: PostMissieKostVerdelingModel) {
  let arr: PostMissieKostenArr[] = [];
  kosten.map((record) => {
    arr.push({
      bedrag: new Prisma.Decimal(Number(record.bedrag)),
      userId: record.userid,
      datum: getUnixTime(new Date()),
      mededeling: `Afrekening missie "${atob(unescape(missienaam))}"`,
    });
  });
  const response = await db.finTransactie.createMany({ data: arr });
  return `${kosten.length} records bewaard`;
}

interface PostMissieAfsluitingModel {
  missieid: number;
  afsluiten: boolean;
}
export async function PostMissieAfsluiting({
  missieid,
  afsluiten,
}: PostMissieAfsluitingModel) {
  const update = await db.missie.update({
    where: {
      id: missieid,
    },
    data: {
      afgsloten: afsluiten,
    },
  });
  return update;
}
