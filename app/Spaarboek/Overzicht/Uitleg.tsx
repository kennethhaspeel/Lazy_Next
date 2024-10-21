"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function Uitleg() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>Toon Uitleg</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Waar, waarom, hoe, wuk nog ?
              </ModalHeader>
              <ModalBody>
                <p className="bg-slate-500  dark:bg-slate-800 p-2 rounded-lg text-white">
                  Waar
                </p>
                <p>
                  Met uw overschotjes aan geld kunt u altijd terecht op <span className="text-lg font-bold">BE79
                  9733 6524 3733</span> 
                </p>
                <p className="bg-slate-500  dark:bg-slate-800 p-2 rounded-lg text-white">
                  Waarom
                </p>
                <p>
                  Het is de bedoeling om ooit een missie richting Polen te
                  ondernemen.
                  <br />
                  Deze missie zal iets langer duren dan een doorsnee missie,
                  namelijk een dag of vier, vijf. Ook mogen, indien gewenst,
                  partners mee. Daardoor zal deze missie ook meer kosten dan een
                  doorsnee missie. Het kan dus handig zijn om al een spaarpotje
                  aan te leggen.
                </p>
                <p className="bg-slate-500  dark:bg-slate-800 p-2 rounded-lg text-white">
                  Hoe
                </p>
                <p>Je bent totaal vrij.</p>
                <ul>
                  <li>Je bent niet verplicht om te sparen.</li>
                  <li>
                    Je kiest zelf het bedrag dat je spaart. Wil je vijf euro
                    sparen? Geen probleem. Wil je tweehonderd sparen? Geen
                    probleem.
                  </li>
                  <li>
                    Je kiest zelf wanneer je wilt sparen. Wil je maandelijk iets
                    overschrijven? Geen probleem. Tweemaandelijks? Geen
                    probleem.
                  </li>
                </ul>
                Je spaart voor jezelf, voor je eigen uitgaven. Dus wil je niet
                sparen, dan doe je dat niet.
                <p className="bg-slate-500  dark:bg-slate-800 p-2 rounded-lg text-white">
                  Wuk nog
                </p>
                <p>
                  De rekening zal ook gebruikt worden voor uitgaven tijdens de
                  gewone missies. Dus niet meer van &rdquo;die heeft da betaald,
                  die heeft iets anders betaald&rdquo;. Alles wordt van deze
                  rekening betaald.
                  <br />
                  Op het einde van de missie krijgt iedereen dan door hoeveel
                  het weekend hem gekost heeft. Dit bedrag kan gestort worden op
                  de rekening. Heb je nog genoeg reserve op je spaarboekske, dan
                  kan je er ook voor kiezen om je schuld van je spaarboekske te
                  nemen. Zowel de uitgave als de eventuele vereffening komen dan
                  in dit overzicht.
                  <br />
                  Je kan het dus eigenlijk niet enkel zien als spaarpot voor
                  Polen maar ook voor andere missies.
                </p>
                <small>
                  * de uittreksels worden maar om de paar dagen/weken verwerkt.
                  Het is dus niet, als je morgen stort, dat dit direct te zien
                  zal zijn
                </small>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Sluit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
