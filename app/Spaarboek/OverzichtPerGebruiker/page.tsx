import { authOptions } from '@/app/api/auth/[...nextauth]/AuthOptions';
import { User } from "@prisma/client";
import { GetAllUsers } from "@/lib/actions/UserActions";
import { getServerSession } from 'next-auth';
import React from 'react'
import Tabel from './Tabel';

const page = async () => {
    const session = await getServerSession(authOptions);
    if (session?.user.rollen.indexOf("financieel") === -1 || session === null) {
      return <h1 className="text-5xl">Geen Toegang</h1>;
    }
    const allUsers:User[]= await GetAllUsers(true);
  return (
    <>
    <Tabel users={allUsers}/>
    </>
  )
}

export default page