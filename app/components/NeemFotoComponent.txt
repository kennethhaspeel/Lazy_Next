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
import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import switch_camera from "@/app/afbeeldingen/switch_camera.ico";
import {
  UploadFoto,
  UpdateMissieAfbeeldingRecord,
  BewaarMissieBestand,
} from "./BewaarBestandDB";
import { fromUnixTime, getUnixTime } from "date-fns";

interface Props {
  missieid: number;
  etappeid: number;
  currentUser: string;
  naam?: string;
  voornaam?: string;
  isBewijsstuk: boolean;
}
const NeemFotoComponent = ({
  missieid,
  etappeid,
  currentUser,
  naam,
  voornaam,
  isBewijsstuk,
}: Props) => {
  //console.log(missieid, etappeid, currentUser,naam,voornaam)
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment"
  );

  const capture = useCallback(() => {
    if (webcamRef.current != null) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImageSrc(imageSrc);
    }
  }, [webcamRef]);

  async function BewaarFoto() {
    setSaving(true);

    if (etappeid === 0) {
      const data = new FormData();
      data.append("image", imageSrc!);
      const result = JSON.parse(await UploadFoto(data, []));

      const update = await UpdateMissieAfbeeldingRecord({
        missieid: missieid,
        bestandsnaam: result["name"],
      });
    } else {
      const tags: string[] = [naam!, voornaam!];
      const data = new FormData();
      data.append("image", imageSrc!);
      const result = JSON.parse(await UploadFoto(data, tags));
      const dbdata = {
        missieEtappeId: Number(etappeid),
        bestandsNaam: result.name,
        mime: result.fileType,
        url: result.url,
        width: result.width,
        height: result.height,
        size: result.size,
        fileId: result.fileId,
        uploadDatum: getUnixTime(new Date()),
        userId: currentUser,
        isBewijsstuk: Boolean(isBewijsstuk),
      };
      const dbResult = await BewaarMissieBestand(dbdata);
    }
    setSaving(false)
    onOpen()
  }

  return (
    <>
      <div className="px-5">
        {!imageSrc && (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="100%"
              videoConstraints={{
                facingMode: facingMode,
              }}
            />
            <div className="mt-5 flex flex-wrap gap-4 justify-between">
              <Button
                color="success"
                isIconOnly
                size="md"
                onClick={() => {
                  setFacingMode(facingMode === "user" ? "environment" : "user");
                }}
              >
                <Image
                  src={switch_camera}
                  width={50}
                  height={50}
                  alt="switch camera"
                />
              </Button>
              <Button
                onClick={capture}
                className="min-w-48"
                color="primary"
                size="md"
              >
                Neem foto
              </Button>
            </div>
          </>
        )}
      </div>
      <div>
        {imageSrc && (
          <div className="w-full">
            <h2>Voorbeeld:</h2>
            <Image
              src={imageSrc}
              alt="voorbeeld"
              height={0}
              width={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
            <div className="mb-5 mt-5 w-full">
              <div className="flex justify-between gap-4">
                <Button
                  onClick={() => {
                    setImageSrc(null);
                  }}
                  color="primary"
                  className="w-full"
                  isLoading={saving}
                  isDisabled={saving}
                >
                  Opnieuw
                </Button>
                <Button
                  onClick={BewaarFoto}
                  color="success"
                  className="w-full"
                  isLoading={saving}
                  isDisabled={saving}
                >
                  Bewaar foto
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Alles Bewaard
              </ModalHeader>
              <ModalBody>
                <p>Wilt u nog een foto nemen?</p>
              </ModalBody>
              <ModalFooter>
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
                      setImageSrc(null);
                      onClose();
                    }}
                  >
                    Ja
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default NeemFotoComponent;
