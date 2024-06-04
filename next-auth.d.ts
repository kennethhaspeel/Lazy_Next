import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            naam: string,
            voornaam:string,
            rollen: string[]?,
        } & DefaultSession
    }

    interface User extends DefaultUser {
        naam: string,
        voornaam:string,
        rollen: string[]?,
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        naam: string,
        voornaam:string,
        rollen: string[]?,
    }
}