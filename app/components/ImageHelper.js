import ImageKit from "imagekit";
import {getPlaiceholder} from "plaiceholder"

var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLICKEY,
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
  urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
});

export const GetImageSignedUrl = (url,hoogte=0,breedte=0, blur = false, watermerk=false) => {
  let imageUrl = imagekit.url({
    path: url,
    signed: true,
    expireSeconds: 3600,
    transformation: [
      {
        height: hoogte,
      },
      {
        blur: blur ? 30 : 0,
      },
      {
        raw: watermerk
          ? "l-image,i-airborn_logo.png,w-150,lx-N50,ly-N75,l-end"
          : "",
      },
    ],
    transformationPosition: "query",
  });
  console.log(imageUrl);
  return imageUrl;
};

export const getBase64 = async (url)=>{
  try {
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`)
    }

    const buffer = await res.arrayBuffer()

    const { base64 } = await getPlaiceholder(Buffer.from(buffer))

    console.log(`base64: ${base64}`)

    return base64

} catch (e) {
    if (e instanceof Error) console.log(e.stack)
}
}
