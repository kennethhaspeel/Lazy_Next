import db from "@/lib/prisma";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import NextAuth from "next-auth/next";

export const authOptions: AuthOptions = {
pages:{
  signIn: "/identity/login",
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

        if (!credentials?.paswoord) throw new Error("Gelieve een paswoord in te geven");
        const isPassowrdCorrect = await bcrypt.compare(credentials.paswoord, user.paswoord);

        if (!isPassowrdCorrect) throw new Error("User name or password is not correct");
        let arr: string[] = [];
        user.UserRoles.map((rol) => {
          arr.push(rol.rol.rolnaam);
          
        });

        const u = {
            id: user.id,
            email: user.email,
            voornaam: user.voornaam,
            naam: user.naam,
            rollen:arr
        }
        console.log(u)
        return u;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      console.log(`Logging van callback: ${user}`)
      if(user) token.user=user

      //if (user) token.rollen = user.rollen;
      return token;
    },

    async session({ token, session }) {
        if (session?.user) session.user = token.user 
        return session
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };