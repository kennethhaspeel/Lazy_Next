import Image from "next/image";
import ImageNotFound from '@/app/afbeeldingen/ImageNotFound.jpg'


const MissieBlokNoImage = () => {
  return (
    <Image
    src={ImageNotFound}
    alt="Card background"
    sizes="250px"
    fill
  />
  )
}

export default MissieBlokNoImage