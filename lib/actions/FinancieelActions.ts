"use server"

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