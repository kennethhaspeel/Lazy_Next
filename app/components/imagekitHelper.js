import ImageKit from "imagekit";

var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLICKEY,
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
  urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
});

export const GetImageSignedUrl = (url, blur = false, thumbnail = false) => {
  let imageUrl = imagekit.url({
    path: url,
    signed: true,
    expireSeconds: 3600,
    transformation: [
      {
        height: thumbnail ? 500 : 2000,
      },
      {
        blur: blur ? 30 : 0,
      },
      {
        raw: thumbnail
          ? ""
          : "l-image,i-airborn_logo.png,w-50,lx-N30,ly-N30,l-end",
      },
    ],
    transformationPosition: "query",
  });
  console.log(imageUrl);
  return imageUrl;
};

export const GetImageAsDate = async (url)=>{
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((onSuccess, onError) => {
    try {
      const reader = new FileReader() ;
      reader.onload = function(){ onSuccess(this.result) } ;
      reader.readAsDataURL(blob) ;
    } catch(e) {
      onError(e);
    }
  });
}
