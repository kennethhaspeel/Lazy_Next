import React from "react";

const FullPageImage = (props: { url: string }) => {
  console.log(`FullPageImage: ${ props.url}`);
  console.log(`FullPageImage: ${ atob(props.url)}`);
  return (
    <div className="flex h-full w-screen min-w-0 items-center justify-center text-white">
      <div className="flex-shrink flex-grow">
        <img src={atob(props.url)} alt="afbeelding" />
      </div>
    </div>
  );
};

export default FullPageImage;
