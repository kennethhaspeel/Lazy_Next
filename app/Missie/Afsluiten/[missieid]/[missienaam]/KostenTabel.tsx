"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Link,
  Divider,
} from "@nextui-org/react";
import { useState } from "react";
import {
  PostMissieAfsluiting,
  PostMissieKosten,
} from "@/lib/actions/MissieActions";

interface Props {
  kosten: MissiekostenPerDeelnemer[];
  missieid: number;
  missienaam: string;
}

const KostenTabel = ({ kosten, missieid, missienaam }: Props) => {
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
    <div className="flex flex-grow text-xl place-content-center my-3">
{atob(unescape(missienaam))}
    </div>
      <Table aria-label="Overzicht Kosten" hideHeader key="rekening">
        <TableHeader>
          <TableColumn>Naam</TableColumn>
          <TableColumn>Bedrag</TableColumn>
        </TableHeader>
        <TableBody items={kosten} emptyContent={"Geen gegevens"}>
          {kosten
            .filter((kost) => kost.userid === "clxucmprp0002p31rf6p6mux3")
            .map((kost) => (
              <TableRow key={kost.userid}>
                <TableCell>Uitgaves via rekening</TableCell>
                <TableCell>{kost.bedrag.toFixed(2)}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Divider className="mt-2 mb-2" />
      <Table aria-label="Overzicht Kosten" key="deelnemers">
        <TableHeader>
          <TableColumn>Naam</TableColumn>
          <TableColumn>Bedrag</TableColumn>
        </TableHeader>
        <TableBody
          key="tabelBodyDeelnemers"
          items={kosten}
          emptyContent={"Geen gegevens"}
        >
          {kosten
            .filter((kost) => kost.userid != "clxucmprp0002p31rf6p6mux3")
            .map((kost) => (
              <TableRow key={kost.userid}>
                <TableCell>{kost.naam}</TableCell>
                <TableCell>{kost.bedrag.toFixed(2)}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="mb-5 mt-5 w-full">
        <Button
          className="w-full"
          color="primary"
          type="submit"
          disabled={loading}
          isLoading={loading}
          onClick={async () => {
            setLoading(true);
            let response = await PostMissieKosten({
              kosten,
              missieid,
              missienaam,
            });
            console.log(response);
            let afsluiten: boolean = true;
            let afsluiting = await PostMissieAfsluiting({
              missieid,
              afsluiten,
            });
            console.log(afsluiting);
            onOpen();
          }}
        >
          {loading ? "Alles wordt verwerkt" : "Bewaar"}
        </Button>
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
                Missie Afsluiten
              </ModalHeader>
              <ModalBody>
                <p>Alles Bewaard</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  as={Link}
                  href={`/Missie/Gegevens/${missieid}`}
                  color="primary"
                >
                  OK
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default KostenTabel;
