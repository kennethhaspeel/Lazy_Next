"use client";
import React, {
  ChangeEvent,
  SetStateAction,
  Dispatch,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { Button, Card, CardFooter, CardHeader } from "@nextui-org/react";
import {
  BewaarMissieBestand,
  UpdateMissieAfbeeldingRecord,
  UploadFoto,
} from "@/app/components/BewaarBestandDB";
import { getUnixTime } from "date-fns";
import pdfIcon from "../../../../../afbeeldingen/fileicons/pdf.png";
import { isatty } from "tty";
import ExifReader from "exifreader";
import Compressor from "compressorjs"

interface Props {
  setToonUploadKeuzes: Dispatch<SetStateAction<boolean>>;
  setAllesBewaard: Dispatch<SetStateAction<boolean>>;
  missieid: number;
  etappeid: number;
  isBewijsstuk: boolean;
  currentUser: string;
  naam?: string;
  voornaam?: string;
  isAfbeelding: boolean;
}
const BestandOpladen = ({
  setToonUploadKeuzes,
  setAllesBewaard,
  missieid,
  etappeid,
  currentUser,
  naam,
  voornaam,
  isBewijsstuk,
  isAfbeelding,
}: Props) => {
  const [bestand, setBestand] = useState<string | null>(null);
  const [bestandsnaam, setBestandsnaam] = useState<string | null>(null);
  const [bestandsgrootte, setBestandsgrootte] = useState<string | null>(null);
  const [toonPDF, setToonPDF] = useState<boolean>(false);
  const [saving, setSaving] = useState(false);
  const triggerUploadBestand = useRef<HTMLInputElement>(null);

  const triggerFunction = () => {
    triggerUploadBestand.current!.click();
  };
  useEffect(() => {
    triggerUploadBestand.current!.click();
  }, []);
  const GetGeoLocatie = async (bestand:string)=>{
    try {
          const {gps} =  await ExifReader.load(bestand,{expanded:true})
    return gps
    } catch {
      console.log('Geen gps data gevonden')
      return undefined
    }

  }
  const ToonVoorbeeld = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      throw new Error("Geen foto geselecteerd");
    }
    const file = event.target.files[0];
    setBestandsnaam(file.name);
    setBestandsgrootte((Number(file.size) / 1024 / 1024).toFixed(2));
    if (file) {
      new Compressor(file,{
        quality:0.8,
        maxWidth: 3000,
        maxHeight:3000,
        checkOrientation:true,
        retainExif:true,
        success(result){
          console.log((Number(result.size) / 1024 / 1024).toFixed(2));
          const reader = new FileReader();
          reader.onloadend = () => {
            setBestand(reader.result as string);
          };
          reader.readAsDataURL(result);
        },
        error(err){console.log(err)}
      })
      
      // const reader = new FileReader();
      // setBestandsnaam(file.name);
      // setBestandsgrootte((Number(file.size) / 1024 / 1024).toFixed(2));

      // console.log(file.name);

    }
  };

  async function BewaarBestand() {
    if (bestand) {
      setSaving(true)

      if (etappeid == 0) {
        const result = JSON.parse(await UploadFoto(bestand, [], bestandsnaam!));
        const update = await UpdateMissieAfbeeldingRecord({
          missieid: missieid,
          bestandsnaam: result["name"],
        });
      } else {
        const tags: string[] = [naam!, voornaam!];
        
        const result = JSON.parse(
          await UploadFoto(bestand, tags, bestandsnaam!)
        );
        console.log(result);
        const gps = await GetGeoLocatie(bestand)
        const dbdata = {
          missieEtappeId: Number(etappeid),
          bestandsNaam: result.name,
          mime: result.fileType,
          url: result.url,
          width: result.width || 0,
          height: result.height || 0,
          size: result.size,
          fileId: result.fileId,
          uploadDatum: getUnixTime(new Date()),
          userId: currentUser,
          isBewijsstuk: isBewijsstuk === true,
          locatie: gps != undefined ? JSON.stringify(gps) : null
        };
        const dbResult = await BewaarMissieBestand(dbdata);
      }
      setSaving(false)
      setToonUploadKeuzes(true);
      setAllesBewaard(true);
    }
  }
  return (
    <>
      <div>
        <form hidden>
          <input
            ref={triggerUploadBestand}
            type="file"
            accept={isAfbeelding ? "image/*" : "application/pdf"}
            onChange={ToonVoorbeeld}
            name="image"
          />
        </form>
      </div>
      <div>
        {bestand && isAfbeelding && (
          <div className="flex justify-center items-center">
            <Image
              src={bestand}
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
        )}
      </div>
      {!isAfbeelding && bestand != null && (
        <div className="flex w-full justify-center items-center">
          <Card className="max-w-[250px]">
            <CardHeader className="flex gap-3">
              <Image
                alt="pdf icoon"
                className="object-cover"
                height={250}
                width={250}
                src={pdfIcon}
              />
            </CardHeader>
            <CardFooter>
              <div className="flex flex-col">
                <div className="text-tiny text-white/80">
                  Bestandsnaam: {bestandsnaam}
                </div>
                <div className="text-tiny text-white/80">
                  Bestandsgrootte: {bestandsgrootte} MB
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}

      <div className="flex w-full justify-items-stretch gap-4  pt-4">
        <div className="grow">
          <Button
            className="w-full"
            color="danger"
            disabled={saving}
            isLoading={saving}
            onClick={() => {
              setToonUploadKeuzes(true);
            }}
          >
            Annuleer
          </Button>
        </div>
        <div className="grow">
          <Button
            className="w-full"
            color="warning"
            disabled={saving}
            isLoading={saving}
            onClick={() => triggerFunction()}
          >
            Opnieuw
          </Button>
        </div>
        <div className="grow">
          <Button
            className="w-full"
            color="success"
            isDisabled={bestand == null || saving}
            isLoading={saving}
            onClick={() => BewaarBestand()}
          >
            Bewaren
          </Button>
        </div>
      </div>
    </>
  );
};

export default BestandOpladen;
