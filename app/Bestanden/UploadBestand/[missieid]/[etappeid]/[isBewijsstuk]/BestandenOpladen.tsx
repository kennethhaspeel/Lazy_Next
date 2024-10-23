import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Progress,
} from "@nextui-org/react";
import ExifReader from "exifreader";
import Compressor from "compressorjs";
import {
  BewaarMissieBestand,
  UpdateMissieAfbeeldingRecord,
  UploadFoto,
} from "@/app/components/BewaarBestandDB";
import { getUnixTime } from "date-fns";

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

interface BestandModel {
  index: number;
  bestand: string;
  bestandsnaam: string;
  gps?: ExifReader.GpsTags;
  bestandsgrootteVoor: string;
  bestandsgrootte: string;
}
const BestandenOpladen = ({
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
  const [bestanden, setBestanden] = useState<BestandModel[]>([]);
  const [saving, setSaving] = useState(false);
  const [toonFout, setToonFout] = useState(false);
  const [progressZichtbaar, setProgressZichtbaar] = useState(false);
  const [totalSaved, setTotalSaved] = useState<number>(0);
  const [foutBoodschap, setFoutBoodschap] = useState<string>("");
  const triggerUploadBestand = useRef<HTMLInputElement>(null);
  const triggerFunction = () => {
    triggerUploadBestand.current!.click();
  };
  const GetGeoLocatie = async (bestand: string) => {
    try {
      const { gps } = await ExifReader.load(bestand, { expanded: true });
      return gps;
    } catch {
      console.log("Geen gps data gevonden");
      return undefined;
    }
  };
  useEffect(() => {
    triggerUploadBestand.current!.click();
  }, []);
  const ToonVoorbeeld = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files?.length);
    if (!event.target.files) {
      setFoutBoodschap("Geen foto geselecteerd");
      setToonFout(true);
      return;
    }
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      new Compressor(files[i], {
        quality: 0.8,
        maxWidth: etappeid === 0 ? 1000 : 3000,
        maxHeight: etappeid === 0 ? 1000 : 3000,
        checkOrientation: true,
        retainExif: true,
        success(result) {
          const reader = new FileReader();
          reader.onloadend = async () => {
            let str = reader.result as string;
            let gps = await GetGeoLocatie(str);
            setBestanden((prevBestanden) => {
              return [
                ...prevBestanden,
                {
                  index: i,
                  bestandsnaam: files[i].name,
                  gps: gps,
                  bestand: str,
                  bestandsgrootteVoor: (
                    Number(files[i].size) /
                    1024 /
                    1024
                  ).toFixed(2),
                  bestandsgrootte: (Number(result.size) / 1024 / 1024).toFixed(
                    2
                  ),
                },
              ];
            });
          };
          reader.readAsDataURL(result);
        },
        error(err) {
          console.log(err);
        },
      });
    }
  };

  const BewaarBestanden = async () => {
    setSaving(true);
    setProgressZichtbaar(true);
    const tags: string[] = [naam!, voornaam!];

    if (Number(etappeid) == 0) {
      const result = JSON.parse(
        await UploadFoto(bestanden[0].bestand, [], bestanden[0].bestandsnaam)
      );
      const update = await UpdateMissieAfbeeldingRecord({
        missieid: missieid,
        bestandsnaam: result.url,
      });
      setTotalSaved((prev) => prev + 1);
    } else {
      bestanden.forEach(async (bestand) => {
        const result = JSON.parse(
          await UploadFoto(bestand.bestand, tags, bestand.bestandsnaam!)
        );
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
          isBewijsstuk: isBewijsstuk,
          locatie:
            bestand.gps != undefined ? JSON.stringify(bestand.gps) : null,
        };
        const dbResult = await BewaarMissieBestand(dbdata);
        setTotalSaved((prev) => prev + 1);
      });
    }
  };

  useEffect(() => {
    if (bestanden.length > 0) {
      if (totalSaved === bestanden.length) {
        setSaving(false);
        setToonUploadKeuzes(true);
        setAllesBewaard(true);
        setProgressZichtbaar(false);
        setBestanden([]);
      }
    }
  }, [totalSaved]);
  return (
    <>
      <div>
        {toonFout && (
          <div className="flex">
            <div className="grow h-14 bg-red-500 rounded-lg content-center ps-5 text-xl">
              {foutBoodschap}
            </div>
          </div>
        )}

        <form hidden>
          <input
            ref={triggerUploadBestand}
            type="file"
            accept={isAfbeelding ? "image/*" : "application/pdf"}
            onChange={ToonVoorbeeld}
            name="image"
            multiple={etappeid != 0}
          />
        </form>
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-2"
          key={"bestanden"}
        >
          {bestanden?.map((bestand) => {
            return (
              <Card className="py-4" key={bestand.index}>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <p className="text-tiny uppercase font-bold">
                    {bestand.bestandsnaam.length > 30
                      ? `${bestand.bestandsnaam.substring(0, 15)}...`
                      : bestand.bestandsnaam}
                  </p>
                  <small className="text-default-500">
                    Origineel: {bestand.bestandsgrootteVoor} MB
                  </small>
                  <small className="text-default-500">
                    Upload: {bestand.bestandsgrootte} MB
                  </small>
                </CardHeader>
                <CardBody className="overflow-hidden py-2">
                  <Image
                    key={bestand.index}
                    src={bestand.bestand}
                    alt="afbeelding"
                    width={200}
                    height={200}
                    isBlurred
                    className="m-2"
                  />
                </CardBody>
                <CardFooter className="flex flex-row">
                  <Button className="w-full" color="danger" isLoading={saving}>
                    Verwijderen
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        {progressZichtbaar && (
          <div className="flex w-full">
            <Progress
              isIndeterminate
              className="max-w-md mt-2"
              aria-label="bewaren"
            />
          </div>
        )}

        {bestanden?.length > 0 && (
          <div className="flex w-full justify-items-stretch gap-4  pt-4">
            <div className="grow" key="0">
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
            <div className="grow" key="2">
              <Button
                className="w-full"
                color="success"
                isDisabled={saving}
                isLoading={saving}
                onClick={() => BewaarBestanden()}
              >
                Bewaren
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BestandenOpladen;
