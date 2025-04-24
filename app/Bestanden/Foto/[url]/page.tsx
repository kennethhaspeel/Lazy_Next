import React from "react";
import FullPageImage from "@/app/components/FullPageImage";

interface ModalProps {
  params: {
    url: string;
  };
}
const ModalFoto = ({ params: { url } }: ModalProps) => {
  console.log(url)
  return (
    <div className="flex h-full min-h-0 w-full min-w-0 overflow-y-hidden">
      <FullPageImage url={url} />
    </div>
  );
};

export default ModalFoto;
