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
import {
  UploadFoto,
  UpdateMissieAfbeeldingRecord,
  BewaarMissieBestand,
} from "../../../../../components/BewaarBestandDB";
import { fromUnixTime, getUnixTime } from "date-fns";
import { ChangeEvent, useRef, useState } from "react";

interface Props {
  missieid: number;
  etappeid: number;
  currentUser: string;
  naam?: string;
  voornaam?: string;
  isBewijsstuk: boolean;
}

const BestandInput = ({
  missieid,
  etappeid,
  currentUser,
  naam,
  voornaam,
  isBewijsstuk,
}: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [verbergNeemFoto, setVerbergNeemFoto] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const triggerFoto = useRef<HTMLInputElement>(null);

  const handleCapture = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      throw new Error("Geen foto geselecteerd");
    }
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
      setVerbergNeemFoto(true);
    }
  };

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
        isBewijsstuk: isBewijsstuk === true,
      };
      const dbResult = await BewaarMissieBestand(dbdata);
    }
    setSaving(false);
    onOpen();
  }

  return (
    <div>
      <form hidden action={BewaarFoto}>
        <input
          ref={triggerFoto}
          type="file"
          accept="image/*,.pdf"
          onChange={handleCapture}
          name="image"
        />
        <input type="text" name="missieid" value={missieid} readOnly />
      </form>
      <div className="w-full" hidden={verbergNeemFoto}>
        <Button
          className="dark:hover:bg-slate-500 dark:hover:text-white p-2 rounded-lg transition-colors mt-3 w-full"
          onClick={() => {
            setVerbergNeemFoto(true);
            triggerFoto.current!.click();
          }}
        >
          Neem Foto
        </Button>
      </div>
      <div className="grid grid-cols-1">
        <div>
          {imageSrc && (
            <>
              <div>
                <div className="flex justify-center items-center">
                  <Image
                    src={imageSrc}
                    alt="voorbeeld"
                    height={0}
                    width={0}
                    sizes="100vw"
                    style={{
                      width: "auto",
                      height: "auto",
                      maxHeight: "600px",
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-between pt-6 gap-4">
                <Button
                  className="w-full inline-flex"
                  onClick={() => {
                    setImageSrc(null);
                    triggerFoto.current!.click();
                  }}
                >
                  Opnieuw
                </Button>
                <Button
                  className="w-full"
                  onClick={() => BewaarFoto()}
                  isLoading={saving}
                >
                  Bewaar
                </Button>
              </div>
            </>
          )}
        </div>
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
    </div>
  );
};

export default BestandInput;
