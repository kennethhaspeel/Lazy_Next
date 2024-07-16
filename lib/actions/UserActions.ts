"use server";
import db from "../prisma";

export async function GetAllUsers() {
  const result = await db.user.findMany({
    where: {
      emailBevestigd: true,
    },
    orderBy: [
      {
        voornaam: "asc",
      },
    ],
  });
  return result;
}

export async function GetUserById(id:string) {
  const result = await db.user.findFirst({
    where: {
      id: id,
    },
  });
  return result;
}

export async function GetMissieDeelnemers(id: number) {
  const result = await db.missieUser.findMany({
    where: {
      missieId: id,
    },
    include: {
      user: {
        select: {
          naam: true,
          voornaam: true,
        },
      },
    },
  });
  let MissieDeelnemers: MissieDeelnemerModel[] = [];
  result!.map((deelnemer) => {
    MissieDeelnemers.push({
      id: deelnemer.userId,
      naam: `${deelnemer.user.voornaam} ${deelnemer.user.naam}`,
      isOrganisator: deelnemer.isOrganisator,
    });
  });
  return MissieDeelnemers;
}
