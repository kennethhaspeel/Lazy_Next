import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import db from "@/lib/prisma";
import { gebruiker } from "@/next-auth";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/identity/login",
    signOut:"/identity/LogUit"
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "john.doe@mail.com",
        },
        paswoord: { label: "Paswoord", type: "password" },
      },
      async authorize(credentials) {
        const user = await db.user.findUnique({
          include: {
            UserRoles: {
              include: {
                rol: {
                  select: {
                    rolnaam: true,
                  },
                },
              },
            },
          },
          where: { email: credentials?.email },
        });

        if (!user) throw new Error("Email of paswoord zijn niet correct");
        if (!user.emailBevestigd)
          throw new Error("U moet eerst uw email adres bevestigen");

        if (!credentials?.paswoord)
          throw new Error("Gelieve een paswoord in te geven");
        const isPassowrdCorrect = await bcrypt.compare(
          credentials.paswoord,
          user.paswoord
        );

        if (!isPassowrdCorrect)
          throw new Error("User name or password is not correct");
        let arr: string[] = [];
        user.UserRoles.map((rol) => {
          arr.push(rol.rol.rolnaam);
        });

        const u: gebruiker = {
          id: user.id,
          email: user.email,
          voornaam: user.voornaam,
          naam: user.naam,
          telefoon: user.telefoon,
          image: user.image,
          rollen: arr,
        };
        return u;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },

    async session({ token, session }) {
      if (session?.user) {
        session.user.id = token.user.id;
        session.user.email = token.user.email;
        session.user.voornaam = token.user.voornaam;
        session.user.naam = token.user.naam;
        session.user.telefoon = token.user.telefoon;
        session.user.image = token.user.image;
        session.user.rollen = token.user.rollen;
      }
      return session;
    },
  },
};
