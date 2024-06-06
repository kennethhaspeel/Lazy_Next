"use server";

import { User } from "@prisma/client";
import { prisma } from "../prisma";
import * as bcrypt from "bcrypt";
import { compileerActivatieMail } from "./ZendMail";
import { verifyJwt } from "../jwt";

// export async function RegistreerGebruiker(user: Omit<User,"id"|"image"|"createdAt"|"updatedAt">){
//     console.log(user)
//     // const result = await prisma.user.create({

//     // })
// }

export async function RegistreerGebruiker(user: registratieModel) {
  console.log(user);
  if (user.geheimeVraag.toUpperCase() !== "MISSIE") {
    throw new Error("Antwoord op de geheime vraag is verkeerd");
  }
  const result = await prisma.user.create({
    data: {
      naam: user.naam,
      voornaam: user.voornaam,
      telefoon: user.telefoon,
      email: user.email,
      paswoord: await bcrypt.hash(user.paswoord, 10),
    },
  });
  const body = compileerActivatieMail(user.voornaam, "");
  return result;
}

type ActivateUserFunc = (
  jwtUserId: string
) => Promise<"userNotExist" | "alreadyActivated" | "success">;

export const activateUser: ActivateUserFunc = async (jwtUserID) => {
  const payload = verifyJwt(jwtUserID);
  const userId = payload?.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) return "userNotExist";
  if (user.emailBevestigd) return "alreadyActivated";
  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      emailBevestigd: true,
    },
  });
  return "success";
};
