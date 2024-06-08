import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import React from "react";
import LoginButton from "./LoginButton";
import Link from "next/link";
import { Image } from "@nextui-org/react";

const Header = () => {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link href="/">
          <Image
            width={48}
            alt="Logo"
            src="/Afbeeldingen/pwa/android-chrome-192x192-trans.png"
          />
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4">
        <NavbarItem>
          <Link
            color="foreground"
            className="hover:text-sky-500 transition-colors"
            href="/"
          >
            Home
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <LoginButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
