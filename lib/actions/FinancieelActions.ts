"use server"

import { FinTransactie, Prisma, SpaarTransactie } from "@prisma/client";
import db from "../prisma";

export async function GetTransactiesPerPersoon(userid:string){
    const result = await db.finTransactie.findMany({
        where:{
            userId: userid
        },
        orderBy:[{
            datum:"desc"
        }]
    })
    return result
}

export async function PostTransactieSpaarboek(data:PostTransactieSpaarboekModel){
    const result = await db.spaarTransactie.create({
        data:{
            datum:data.datum,
            bedrag:new Prisma.Decimal(data.bedrag),
            mededeling:data.mededeling,
            userId:data.userId,

        }
    })

    return result.id
}

export async function PostTransactie(data:PostTransactieSpaarboekModel){
    const result = await db.finTransactie.create({
        data:{
            datum:data.datum,
            bedrag:new Prisma.Decimal(data.bedrag),
            mededeling:data.mededeling,
            userId:data.userId,

        }
    })
    return result.id
}