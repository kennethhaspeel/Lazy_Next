import { getBase64, GetImageSignedUrl } from "@/app/components/ImageHelper";
import Image from "next/image";

interface Props {
    imageUrl:string
}
const MissieBlokRemoteAfbeelding = async ({imageUrl}:Props) => {
    const blurred = await getBase64(GetImageSignedUrl(imageUrl, 100, 0, true));
    
      const url = GetImageSignedUrl(imageUrl, 250, 0, false)

  return (
    <Image
    src={url!}
    alt="Card background"
    className="object-cover rounded-xl"
    sizes="(max-width: 640px) 100vw,
 (max-width: 1280px) 50vw,
 (max-width: 1536px) 33vw,
 25vw"
    width={720}
    height={480}
    placeholder="blur"
    blurDataURL={blurred}
  />
  )
}

export default MissieBlokRemoteAfbeelding

