import { Missie,MissieEtappe,MissieUser,User } from "@prisma/client";
import { prisma } from "../prisma";

export async function GetAllMissions(){
    const result = await prisma.missie.findMany({
        orderBy:[
            {
                startDatum:'desc'
            }
        ],
        include: {
            MissieUser:{
                include:{
                    user:{
                        select:{
                            naam:true,
                            voornaam:true
                        }
                    }
                }
            }
        }
    })
    console.log(result)
    return result;
}