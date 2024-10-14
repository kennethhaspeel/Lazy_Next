"use client";
import { User } from "@prisma/client";
import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

interface Props {
  users: User[];
}
const Tabel = ({ users }: Props) => {
  const [value, setValue] = React.useState<string>("");
  return (
    <Select
      label="Selecteer Gebruiker"
      variant="flat"
      className="max-w-xs"
      onChange={(e)=>{
        setValue(e.target.value)
      }}
      aria-label="selecteer gebruiker"
    >
      {users.map((user) => (
        <SelectItem key={user.id} value={user.id}>
          {`${user.voornaam} ${user.naam}`}
        </SelectItem>
      ))}
    </Select>
  );
};

export default Tabel;
