import { getBase64, GetImageSignedUrl } from "@/app/components/ImageHelper";
import Image from "next/image";

interface Props {
    imageUrl:string
}
const MissieBlokRemoteAfbeelding = async ({imageUrl}:Props) => {
    const blurred = await getBase64(GetImageSignedUrl(imageUrl, 100, 0, true));
    
      const url = await getBase64(GetImageSignedUrl(imageUrl, 1000, 0, false));

  return (
    <Image
    src={url!}
    alt="Card background"
    className="object-cover rounded-xl"
    sizes="250px"
    placeholder="blur"
    blurDataURL={blurred}
    fill
  />
  )
}

export default MissieBlokRemoteAfbeelding