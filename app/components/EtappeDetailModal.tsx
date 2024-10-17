import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { MissieEtappe } from "@prisma/client";
import { Dispatch, SetStateAction, FunctionComponent } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  modalData: EtappeDetail | null;
  setModalData: Dispatch<SetStateAction<EtappeDetail | null>>;
}
const EtappeDetailModal = ({
  modalOpen,
  setModalOpen,
  modalData,
  setModalData,
}: Props) => {
  return (
    <>
      <Modal isOpen={modalOpen} size="3xl" hideCloseButton>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Overzicht Detail
              </ModalHeader>
              <ModalBody>
                <>
                  {modalData ? (
                    <div>
                      <div className="w-full bg-slate-500 rounded-md p-2">
                        Titel
                      </div>
                      <div className="w-full p-2">{modalData.titel}</div>
                      <div className="w-full bg-slate-500 rounded-md p-2">
                        Omschrijving
                      </div>
                      <div className="w-full p-2">
                        {modalData.omschrijving &&
                        modalData.omschrijving.length > 0
                          ? modalData.omschrijving
                          : "geen omschrijving"}
                      </div>
                      <div className="w-full bg-slate-500 rounded-md p-2">
                        Locatie
                      </div>
                      <div className="w-full p-2">
                        {modalData.locatie && modalData.locatie.length > 0
                          ? modalData.locatie
                          : "geen locatie"}
                      </div>
                      <div className="w-full bg-slate-500 rounded-md p-2">
                        Link
                      </div>
                      <div className="w-full p-2">
                        {modalData.url && modalData.url.length > 0
                          ? <Link href={modalData.url}>Klik</Link>
                          : "geen url"}
                      </div>
                      <div className="w-full bg-slate-500 rounded-md p-2">
                        Kost
                      </div>
                      <div className="w-full p-2">
                        &euro; {Number(modalData.kost).toFixed(2)}
                      </div>
                      <div className="w-full bg-slate-500 rounded-md p-2">
                        Betaald door
                      </div>
                      <div className="w-full p-2">{modalData.betaaldDoor}</div>
                      <div className="w-full bg-slate-500 rounded-md p-2">
                        Verschuldigd door
                      </div>
                      <div className="w-full p-2">
                        <div className="p-2 w-full md:max-w-7xl flex flex-wrap gap-3">
                          {modalData.kostenverdeling.map((u) => (
                            <div
                              className="shrink-0 outline outline-green-500 hover:bg-green-300 hover:text-gray-800 p-2 rounded-lg"
                              key={u}
                            >
                              {u}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <LoadingSpinner />
                  )}
                </>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  variant="solid"
                  onPress={() => setModalOpen((modalOpen) => !modalOpen)}
                >
                  Sluit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EtappeDetailModal;
