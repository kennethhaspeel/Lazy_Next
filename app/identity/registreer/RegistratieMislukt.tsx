import React from 'react'

const RegistratieMislukt = (error:string) => {
  return (
    <>
    <h4>Registratie Mislukt</h4>
    <p>{error}</p>
    </>
  )
}

export default RegistratieMislukt