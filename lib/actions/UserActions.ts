"use server"
import db from "../prisma"

export async function GetAllUsers(){
    const result = await db.user.findMany({
        where: {
            emailBevestigd : true
        },
        orderBy:[{
            voornaam:"asc"
        }]
    })
    return result
}