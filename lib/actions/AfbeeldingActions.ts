"use server"

import db from "../prisma"

export async function GetAfbeelding(id:number){
    const afbeeldingData = await db.missieEtappeBestand.findUnique({
        where:{id:id}
    })
    return afbeeldingData
}

export async function GetAfbeeldingenPerEtappe(etappeid:number,bewijsstuk:boolean){
    const afbeeldingData = await db.missieEtappeBestand.findMany({
        where:{
            missieEtappeId: {
                equals: Number(etappeid)
            },
            mime:{
                equals: 'image'
            },
            isBewijsstuk:{
                equals: (bewijsstuk === true)
            }
        }
    })
    return afbeeldingData
}
