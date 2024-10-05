"use client";
import React from "react";
import { FinTransactie, SpaarTransactie } from "@prisma/client";
import {

  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { fromUnixTime } from "date-fns";
import { DateToDDMMYYYY } from "@/app/components/DatumHelper";

interface Props {
  items: FinTransactie[];
}
const FinListbox = ({ items }: Props) => {
  return (
    <>

      <Table aria-label="tabel" isCompact fullWidth>
        <TableHeader>
          <TableColumn>Datum</TableColumn>
          <TableColumn>Bedrag</TableColumn>
          <TableColumn>Omschrijving</TableColumn>
        </TableHeader>
        <TableBody items={items}  emptyContent={"Geen Data Gevonden."}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell className="min-w-20  content-start">
                {DateToDDMMYYYY(fromUnixTime(item.datum))}
              </TableCell>
              <TableCell className="min-w-20 content-start">
                &euro; {item.bedrag.toString()}
              </TableCell>
              <TableCell className=" p-2 content-start text-wrap">{item.mededeling}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default FinListbox;
