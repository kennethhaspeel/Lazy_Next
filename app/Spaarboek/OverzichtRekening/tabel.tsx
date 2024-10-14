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
      key: "naam",
      label: "Naam",
    },
    {
      key: "datum",
      label: "Datum",
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
    <Table aria-label="rekening overzicht" isStriped>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
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
  );
};

export default Tabel;
