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
<div className="w-full m-3 p-3 rounded-xl dark:bg-slate-800">Totaal: {(items.reduce((accumulator, current) => accumulator + Number(current.bedrag), 0)).toFixed(2)}</div>
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
                &euro; {Number(item.bedrag).toFixed(2)}
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
