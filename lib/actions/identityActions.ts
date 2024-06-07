"use server";

import { User } from "@prisma/client";
import { prisma } from "../prisma";
import * as bcrypt from "bcrypt";
import { ZendMail, compileerActivatieMail, compileerPaswoordResetMail } from "./ZendMail";
import { signJwt, verifyJwt } from "../jwt";


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

  const jwtUserId = signJwt({
    id: result.id,
  });
  const activationUrl = `${process.env.NEXTAUTH_URL}/identity/BevestigRegistratie/${jwtUserId}`;
  const body = compileerActivatieMail(user.voornaam, activationUrl);
  await ZendMail({ to: user.email, subject: "Activate Your Account", body });
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

export async function VergetenPaswoord(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) throw new Error("The User Does Not Exist!");

  //  Send Email with Password Reset Link
  const jwtUserId = signJwt({
    id: user.id,
  });
  const resetPassUrl = `${process.env.NEXTAUTH_URL}/auth/resetPass/${jwtUserId}`;
  const body = compileerPaswoordResetMail(user.voornaam, resetPassUrl);
  const sendResult = await ZendMail({
    to: user.email,
    subject: "Reset Paswoord",
    body: body,
  });
  return sendResult;
}
