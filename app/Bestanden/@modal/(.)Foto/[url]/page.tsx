import React from "react";

import FullPageImage from "@/app/components/FullPageImage";
import { Modal } from "./modal";

// interface ModalProps {
//   params: {
//     url: string;
//   };
// }
// export default async function ModalFoto({ params: { url } }: ModalProps) {
//   console.log(url)
//   return (
//     <Modal>
//       <FullPageImage url={url} />
//     </Modal>
//   );
// };
interface Props {
  params: {
    url:string;
  };
}
export default function ModalFoto({  params: { url }}: Props) {
  // <Modal><FullPageImage url={url} /> </Modal> 
  console.log(url)
  return (  
    <p>{url}</p>
)
}
