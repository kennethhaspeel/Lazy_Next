"use client"
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

const overzichtmissies = () => {

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
        redirect('/identity/login?callbackUrl=/missies/overzichtmissies')
    },
    
})
    if (session?.user.rollen.indexOf("admin") === -1) {
        return <h1 className="text-5xl">Access Denied</h1>
    }


      return (
        <>
        {
         session? (
          <div>overzicht</div>
         ) :(
          'Loading'
         )
        }
          </>
      )
  
}

export default overzichtmissies