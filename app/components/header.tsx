"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import LoginButton from "./LoginButton";
import Link from "next/link";
import { Image } from "@nextui-org/react";
import ThemeSwitch from "./ThemeSwitcher";
import { useSession, signIn, signOut } from "next-auth/react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { data: session } = useSession();
  //console.log(session?.user.naam);
  return (
    <Navbar isBordered isMenuOpen={isMenuOpen}>
      {/* KLEIN SCHERM */}
      <NavbarContent className="flex md:hidden">
        <NavbarBrand>
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            <Image
              width={48}
              alt="Logo"
              src="/Afbeeldingen/pwa/android-chrome-192x192-trans.png"
            />
          </Link>
          <p>
            <Link href="/" onClick={() => toggleMenu}>
              Lazy Company
            </Link>
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" justify="end" className="flex md:hidden">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Sluit menu" : "Open menu"}
          onChange={() => {
            toggleMenu();
          }}
        />
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem key={0}>
          <Link href="/" className="w-full" onClick={() => toggleMenu()}>
            Home
          </Link>
        </NavbarMenuItem>
        {session && session.user ? (
          <>
            <NavbarMenuItem key={1}>
              <Link
                href="/Missie/OverzichtMissies"
                className="w-full"
                onClick={() => toggleMenu()}
              >
                Missies
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem key={2}>
              <Link
                href="/Spaarboek/Overzicht"
                className="w-full"
                onClick={() => toggleMenu()}
              >
                Spaarboekje
              </Link>
            </NavbarMenuItem>
          </>
        ) : (
          ""
        )}

        <NavbarItem>
          <hr />
        </NavbarItem>
        <NavbarItem className="sm:hidden">
          {session && session.user ? (
            <p>
              ingelogd als{" "}
              <span className="font-bold">
                {session.user.voornaam} {session.user.naam}
              </span>
            </p>
          ) : (
            <p>Niet ingelogd</p>
          )}
        </NavbarItem>

        <NavbarItem>
          {session && session.user ? (
            <div className="w-full p-4">
              <Button
                onClick={() => {
                  toggleMenu();
                  signOut();
                }}
                className="w-full"
              >
                Log Uit{" "}
              </Button>
            </div>
          ) : (
            <div className="flex flex-row">
              <div className="w-full p-4">
                <Button
                  onClick={() => {
                    toggleMenu();
                    signIn();
                  }}
                  className="w-full"
                >
                  Log in{" "}
                </Button>
              </div>
              <div className="w-full p-4">
                <Button
                  as={Link}
                  href="/identity/registreer"
                  className="w-full"
                >
                  Registreer
                </Button>
              </div>
            </div>
          )}
        </NavbarItem>
      </NavbarMenu>

      {/* GROOT SCHERM */}
      <NavbarContent
        as="div"
        justify="start"
        className="hidden md:flex max-w-10"
      >
        <NavbarBrand>
          <Image
            width={48}
            alt="Logo"
            src="/Afbeeldingen/pwa/android-chrome-192x192-trans.png"
          />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="start" className="hidden md:flex">
        <NavbarItem>
          <Link href="/">Home</Link>
        </NavbarItem>
        {session && session.user ? (
          <>
        <NavbarItem>
          <Link href="/Missie/OverzichtMissies">Missies</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/Spaarboek/Overzicht">Spaarboekje</Link>
        </NavbarItem>
      
      </>
    ) : ('')}
    </NavbarContent>
      <NavbarContent justify="end" className="hidden md:flex">
        <LoginButton />
        <ThemeSwitch />
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
