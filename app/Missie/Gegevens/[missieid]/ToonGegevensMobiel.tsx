"use client";
import { DateToDDMMYYYY } from "@/app/components/DatumHelper";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
  TableColumn,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";

interface Props {
  missieData: MissieModel;
  currentUser: MissieDeelnemerModel;
}
const ToonGegevensMobiel = ({ missieData, currentUser }: Props) => {
  return (
    <>
      <div className="p-2">
        <Table
          isStriped
          hideHeader
          aria-label="Example static collection table"
        >
          <TableHeader>
            <TableColumn>Lijst</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>Omschrijving</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>{missieData.omschrijving}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>Locatie</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell>{missieData.locatie}</TableCell>
            </TableRow>
            <TableRow key="5">
              <TableCell>Afbeelding</TableCell>
            </TableRow>
            <TableRow key="6">
              <TableCell>
                {missieData.afbeelding ? (
                  <p>Bekijk afbeelding</p>
                ) : (
                  "Nog geen afbeelding"
                )}
              </TableCell>
            </TableRow>
            <TableRow key="7">
              <TableCell>StartDatum</TableCell>
            </TableRow>
            <TableRow key="8">
              <TableCell>{DateToDDMMYYYY(missieData.startDatum)}</TableCell>
            </TableRow>
            <TableRow key="9">
              <TableCell>Einddatum</TableCell>
            </TableRow>
            <TableRow key="10">
              <TableCell>{DateToDDMMYYYY(missieData.eindDatum)}</TableCell>
            </TableRow>
            <TableRow
              key="11"
              className={!currentUser.isOrganisator ? "hidden" : ""}
            >
              <TableCell>
                <Button
                  as={Link}
                  href={`/Missie/GegevensBewerken/${missieData.id}`}
                  className="w-full"
                  color="primary"
                >
                  Bewerken
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ToonGegevensMobiel;
