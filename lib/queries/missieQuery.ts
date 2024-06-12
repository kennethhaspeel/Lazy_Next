import { Missie, MissieEtappe, MissieUser, User } from "@prisma/client";
import { prisma } from "../prisma";

export async function GetAllMissions() {
  const result = await prisma.missie.findMany({
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
