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
  Divider,
} from "@nextui-org/react";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import FotoNemen from "./FotoNemen";
import BestandOpladen from "./BestandOpladen";

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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [toonUploadKeuzes, setToonUploadKeuzes] = useState(true);
  const [toonNeemFoto, setToonNeemFoto] = useState(false);
  const [toonUploadFoto, setToonUploadFoto] = useState(false);
  const [toonUploadPDF, setToonUploadPDF] = useState(false);
  const [allesBewaard, setAllesBewaard] = useState(false);
  const ToggleZichtbaarheid = (onderwerp: string) => {
    switch (onderwerp) {
      case "fotonemen":
        setToonNeemFoto(true);
        setToonUploadFoto(false);
        setToonUploadPDF(false);
        setToonUploadKeuzes(false);
        break;
      case "fotoopladen":
        setToonNeemFoto(false);
        setToonUploadFoto(true);
        setToonUploadPDF(false);
        setToonUploadKeuzes(false);
        break;
      case "pdfopladen":
        setToonNeemFoto(false);
        setToonUploadFoto(false);
        setToonUploadPDF(true);
        setToonUploadKeuzes(false);
        break;
    }
  };

  useEffect(() => {
    if (toonUploadKeuzes) {
      setToonNeemFoto(false);
      setToonUploadFoto(false);
      setToonUploadPDF(false);
    }
  }, [toonUploadKeuzes]);

  return (
    <>
      <div>
        {toonUploadKeuzes && (
          <div className="flex flex-col">
            <div className="w-full pt-2">
              <Link className="w-full" href={`/Missie/Gegevens/${missieid}`}>
                <Button className="w-full" color="primary" size="lg">
                  Terug naar missie
                </Button>
              </Link>
            </div>
            <Divider className="my-4" />
            <div className="w-full pt-2">
              <Button
                className="w-full"
                color="default"
                size="lg"
                onClick={() => {
                  ToggleZichtbaarheid("fotonemen");
                }}
              >
                Foto Nemen
              </Button>
            </div>
            <div className="w-full pt-5">
              <Button
                className="w-full"
                color="default"
                size="lg"
                onClick={() => ToggleZichtbaarheid("fotoopladen")}
              >
                Foto Opladen
              </Button>
            </div>
            {etappeid > 0 && isBewijsstuk && (
              <div className="w-full pt-5">
                <Button
                  className="w-full"
                  color="default"
                  size="lg"
                  onClick={() => ToggleZichtbaarheid("pdfopladen")}
                >
                  PDF Opladen
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      <div>
        {toonNeemFoto && (
          <FotoNemen
            setToonUploadKeuzes={setToonUploadKeuzes}
            setAllesBewaard={setAllesBewaard}
            missieid={missieid}
            etappeid={etappeid}
            currentUser={currentUser}
            naam={naam}
            voornaam={voornaam}
            isBewijsstuk={isBewijsstuk}
          />
        )}
      </div>
      <div>
        {toonUploadFoto && (
          <BestandOpladen
            setToonUploadKeuzes={setToonUploadKeuzes}
            setAllesBewaard={setAllesBewaard}
            missieid={missieid}
            etappeid={etappeid}
            currentUser={currentUser}
            naam={naam}
            voornaam={voornaam}
            isBewijsstuk={isBewijsstuk}
            isAfbeelding={true}
          />
        )}
      </div>
      <div>
        {toonUploadPDF && isBewijsstuk && (
          <BestandOpladen
            setToonUploadKeuzes={setToonUploadKeuzes}
            setAllesBewaard={setAllesBewaard}
            missieid={missieid}
            etappeid={etappeid}
            currentUser={currentUser}
            naam={naam}
            voornaam={voornaam}
            isBewijsstuk={isBewijsstuk}
            isAfbeelding={false}
          />
        )}
      </div>

      <Modal
        isOpen={allesBewaard}
        onOpenChange={onOpenChange}
        isDismissable={false}
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <p>Alles bewaard</p>
                {etappeid > 0 && <p>Wilt u nog iets toevoegen?</p>}
              </ModalBody>
              <ModalFooter>
                {etappeid > 0 && (
                  <div className="flex justify-between gap-4">
                    <Button
                      as={Link}
                      href={`/Missie/Gegevens/${missieid}`}
                      color="default"
                      variant="bordered"
                    >
                      Nee
                    </Button>

                    <Button
                      color="success"
                      variant="solid"
                      onPress={() => {
                        onClose();
                        setAllesBewaard(false);
                      }}
                    >
                      Ja
                    </Button>
                  </div>
                )}
                {etappeid == 0 && (
                  <div className="flex justify-between gap-4">
                    <Button
                      color="success"
                      variant="solid"
                      as={Link}
                      href={`/Missie/Gegevens/${missieid}`}
                    >
                      OK
                    </Button>
                  </div>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Upload;
