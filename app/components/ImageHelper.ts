import ImageKit from "imagekit";
import { getPlaiceholder } from "plaiceholder";

var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLICKEY!,
  privateKey: process.env.IMAGEKIT_PRIVATEKEY!,
  urlEndpoint: process.env.IMAGEKIT_ENDPOINT!,
});

export const generateRandom = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(23).substring(2, 5)
  );
};

export const GetImageSignedUrl = (
  url: string,
  hoogte = 0,
  breedte = 0,
  blur = false,
  watermerk = false
) => {
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

// export const ResizeImage = async (maxWidth = 2500,maxHeight = 2500,bestand:File)=>{
// const img = new Image()

// const bitm = await createImageBitmap(bestand)

// }

export const BestandNaarImagekit = async (
  bestand: FormData,
  tagList: string[]
) => {
  const tags = tagList.join(",");
  //const base:string = await getBase64(bestand)
  const response = await imagekit.upload({
    file: bestand.get("image") as string,
    fileName: `${generateRandom()}.jpeg`,
    useUniqueFileName: true,
    tags: tags,
  });
  return response;
};

export const UploadImage = async (dataUrl: string, tagList: string[]) => {
  const tags = tagList.join(",");
  const response = await imagekit.upload({
    file: dataUrl,
    fileName: `${generateRandom()}.jpeg`,
    useUniqueFileName: true,
    tags: tags,
  });
  return response;
};

export const getBase64 = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`);
  }

  const buffer = await res.arrayBuffer();

  const { base64 } = await getPlaiceholder(Buffer.from(buffer));

  console.log(`base64: ${base64}`);

  return base64;
};
