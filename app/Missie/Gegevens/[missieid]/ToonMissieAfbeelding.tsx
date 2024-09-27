"use client";

import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import {
  ArrowUpTrayIcon,
  CameraIcon,
  ChevronDownIcon,
  EyeIcon,
} from "@heroicons/react/16/solid";

interface Props {
  hasImage: boolean;
  missieid: number;
}

const ToonMissieAfbeelding = ({ hasImage, missieid }: Props) => {
  return (
    <ButtonGroup variant="flat">
      <Button>
        <>
          {hasImage ? <span>1 Afbeelding</span> : <span>Geen Afbeelding</span>}
        </>
      </Button>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly>
            <ChevronDownIcon className="size-6" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="missieafbeelding"
          selectionMode="single"
          className="max-w-[300px]"
          disabledKeys={hasImage ? [] : ["BekijkMissieAfbeelding"]}
        >
          <DropdownItem
            key="BekijkMissieAfbeelding"
            startContent={<EyeIcon className="size-6" />}
            href="/"
          >
            Bekijk
          </DropdownItem>

          <DropdownItem
            key="MissieAfbeeldingNeemFoto"
            startContent={<CameraIcon className="size-6" />}
            href={`/Missie/MissieAfbeelding/${missieid}`}
          >
            Neem Foto
          </DropdownItem>
          <DropdownItem
            key="MissieAfbeeldingOpladen"
            startContent={<ArrowUpTrayIcon className="size-6" />}
            href="/"
          >
            Bestand Opladen
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
};

export default ToonMissieAfbeelding;
