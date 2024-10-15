"use server"

import { GetFinTransactiesPerGebruiker } from "@/lib/actions/FinancieelActions"
import { FinTransactie } from "@prisma/client"


export async function getUserData(id:string){
    const result:FinTransactieModel[] = await GetFinTransactiesPerGebruiker(id)
  return result
}

