"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Link,
} from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";

interface Props {
  missieid: number;
  etappeid: number;
  currentUser: string;
  naam?: string;
  voornaam?: string;
  isBewijsstuk: boolean;
}

const Upload = ({
  missieid,
  etappeid,
  currentUser,
  naam,
  voornaam,
  isBewijsstuk,
}: Props) => {
  const [toonNeemFoto, setToonNeemFoto] = useState(true);
  const [toonUploadFoto, setToonUploadFoto] = useState(false);
  const [toonUploadPDF, setToonUploadPDF] = useState(false);
  const [toonUploadKeuzes, setToonUploadKeuzes] = useState(true);

  const ToggleZichtbaarheid = (onderwerp: string) => {
    switch (onderwerp) {
      case "fotonemen":
        setToonNeemFoto(true);
        setToonUploadFoto(false);
        setToonUploadPDF(false);
        setToonUploadKeuzes(true);
        break;
      case "fotoopladen":
        setToonNeemFoto(false);
        setToonUploadFoto(true);
        setToonUploadPDF(false);
        setToonUploadKeuzes(true);
        break;
      case "pdfopladen":
        setToonNeemFoto(false);
        setToonUploadFoto(false);
        setToonUploadPDF(true);
        setToonUploadKeuzes(true);
        break;
      default:
        setToonNeemFoto(false);
        setToonUploadFoto(false);
        setToonUploadPDF(false);
        setToonUploadKeuzes(true);
    }
  };
  return (
    <>
      <div>
        {toonUploadKeuzes && (
          <div className="flex flex-col">
            <div>
              <Button
                color="default"
                onClick={() => ToggleZichtbaarheid("fotonemen")}
              >
                Foto Nemen
              </Button>
            </div>
            <div>
              <Button
                color="default"
                onClick={() => ToggleZichtbaarheid("fotoopladen")}
              >
                Foto Opladen
              </Button>
            </div>
            <div>
              <Button
                color="default"
                onClick={() => ToggleZichtbaarheid("pdfopladen")}
              >
                PDF Opladen
              </Button>
            </div>
          </div>
        )}
      </div>
      <div>
        {
            toonNeemFoto && (
                <p>Neem Foto</p>
            )
        }
      </div>
      <div>
        {
            toonUploadFoto && (
                <p>Upload Foto</p>
            )
        }
      </div>
      <div>
        {
            toonUploadPDF && (
                <p>Upload PDF</p>
            )
        }
      </div>
    </>
  );
};

export default Upload;
