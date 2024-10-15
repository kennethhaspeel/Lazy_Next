"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { DateToDDMMYYYY } from "@/app/components/DatumHelper";
interface Props {
  items: SpaarboekTransactie[];
}
const Tabel = ({ items }: Props) => {
  const columns = [
    {
      key: "datum",
      label: "Datum",
    },
    {
      key: "naam",
      label: "Naam",
    },

    {
      key: "bedrag",
      label: "Bedrag",
    },
    {
      key: "mededeling",
      label: "Mededeling",
    },
  ];
  return (
    <>
      <div className="w-full m-3 p-3 rounded-xl dark:bg-slate-800">
        Totaal:{" "}
        {items
          .reduce(
            (accumulator, current) => accumulator + Number(current.bedrag),
            0
          )
          .toFixed(2)}
      </div>
      <Table aria-label="rekening overzicht" isStriped>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{DateToDDMMYYYY(item.datum)}</TableCell>
              <TableCell>
                {item.voornaam} {item.naam}
              </TableCell>
              <TableCell>{item.bedrag}</TableCell>

              <TableCell>{item.mededeling}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default Tabel;
