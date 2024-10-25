import React from "react";

interface ModalProps {
  params: {
    url: string;
  };
}
const ModalFoto = ({ params: { url } }: ModalProps) => {
  return (
    <>
      <div className="fixed inset-0 bg-zinc-900/20 z-10">
        <div className="flex items-center h-full max-w-3xl mx-auto">
          <div className="relative bg-white w-full py-20 px-2 rounded-lg">
            <p> page</p>
            <p>{atob(url)}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalFoto;
