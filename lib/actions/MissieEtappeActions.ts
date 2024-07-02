"use server"

import db from "../prisma"

export async function GetAllEtappes(){
    const result = await db.missieEtappe.findMany({
        orderBy:[
            {
                datumTijd:"desc"
            }
        ]
    })
}