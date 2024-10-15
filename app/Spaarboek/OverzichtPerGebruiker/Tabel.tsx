"use client";
import {  User } from "@prisma/client";
import React, {  useEffect, useState } from "react";
import { Divider, Select, SelectItem } from "@nextui-org/react";
import { getUserData } from "./getUserData";
import Overzicht from "./Overzicht";

interface Props {
  users: User[];
}
const Tabel = ({ users }: Props) => {
  const [value, setValue] = React.useState<string | undefined>(undefined);
  const [finTransacties, setFinTransacties] = useState<FinTransactieModel[]|null>(null);

  async function getTransacties(v:string) {
    const d = await getUserData(v!);
    setFinTransacties(d);
  }

  useEffect(() => {
    value != null && getTransacties(value);
  }, [value]);
  return (
    <>
      <Select
        label="Selecteer Gebruiker"
        variant="flat"
        className="max-w-xs"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        aria-label="selecteer gebruiker"
      >
        {users.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            {`${user.voornaam} ${user.naam}`}
          </SelectItem>
        ))}
      </Select>
      <Divider className="my-5" />
      
      {
        finTransacties && <Overzicht data={finTransacties}/>
      }
    </>
  );
};

export default Tabel;
