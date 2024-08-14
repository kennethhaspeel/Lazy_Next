import React from 'react'
import NeemFoto from './NeemFoto'
import Image from "next/image";
import AfbeeldingNeemFoto from "../../../afbeeldingen/TakePicture.jpg"
const MissieAfbeelding = () => {
  return (
    <>
          <section className="pt-5">
        <p className="text-3xl pb-4 text-center">Nieuwe Foto</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <NeemFoto/>
          <div className="hidden md:block p-3">
            <Image
              src={AfbeeldingNeemFoto}
              alt="editformafbeelding"
              className="h-auto max-w-50"
              placeholder="blur"
            />
          </div>
        </div>
      </section>
   
    
    </>
  )
}
export default MissieAfbeelding