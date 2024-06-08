import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

interface gebruiker {
  id: string;
  email: string;
  voornaam: string;
  naam: string;
  telefoon: string?;
  image: string?;
  email: string;
  rollen: string[];
}
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      voornaam: string;
      naam: string;
      telefoon: string?;
      image: string?;
      rollen: string[];
    } & DefaultSession;
  }
  interface User extends DefaultUser {
    id: string;
    email: string;
    voornaam: string;
    naam: string;
    telefoon: string?;
    image: string?;
    rollen: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: {
      id: string;
      email: string;
      voornaam: string;
      naam: string;
      telefoon: string?;
      image: string?;
      rollen: string[];
    };
  }
}

//   interface gebruiker {
//     id: string,
//     email:string,
//     voornaam:string,
//     naam:string,
//     rollen:string[]
//   }
// declare module "next-auth" {
//     interface Session {
//         user: {
//             id: string,
//             naam: string,
//             voornaam:string,
//             rollen: string[]?,
//         } & DefaultSession
//     }

//     interface User extends DefaultUser {
//         naam: string,
//         voornaam:string,
//         rollen: string[]?,
//     }
// }

// declare module "next-auth/jwt" {
//     interface JWT extends DefaultJWT {
//         naam: string,
//         voornaam:string,
//         rollen: string[]?,
//     }
// }
