import ImageKit from "imagekit";
import { getPlaiceholder } from "plaiceholder";
import { ParseDMS } from "./geolocation";
import ExifReader from "exifreader";

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

export const GetGeoLocatie = async (bestand: string) => {
  const tags = await ExifReader.load(bestand, { expanded: true });
  return tags;
};

export const GetImageSignedUrl = (
  url: string,
  hoogte = 0,
  breedte = 0,
  blur = false,
  watermerk = false
) => {
  let imageUrl = imagekit.url({
    src: url,
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
  //console.log(imageUrl);
  return imageUrl;
};

export const GetMetaData = async (url: string) => {

  let meta: any = await imagekit.getFileMetadata(url);
  // try {
  // const { gps } = meta.exif;
  //   const LatLon = ParseDMS(gps.GPSLatitude, gps.GPSLongitude);
  // }
  // catch(exception){
  //   console.log(exception)
  // }



  return meta;
};

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
    isPrivateFile: true,
  });
  return response;
};

export const UploadImage = async (
  dataUrl: string,
  tagList: string[],
  bestandsnaam: string
) => {
  const tags = tagList.join(",");
  const response = await imagekit.upload({
    file: dataUrl,
    fileName: bestandsnaam,
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

  //console.log(`base64: ${base64}`);

  return base64;
};


