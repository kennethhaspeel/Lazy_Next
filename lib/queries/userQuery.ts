import { prisma } from "../prisma";

export async function GetAllUsers(){
    const result = await prisma.user.findMany({
        where: {
            emailBevestigd : true
        },
        orderBy:[{
            voornaam:"asc"
        }]
    })
    return result
}