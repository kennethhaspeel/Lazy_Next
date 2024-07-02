"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ThemeSwitch from "./ThemeSwitcher";

const Footer = () => {
  const { data: session } = useSession();
  const jaar = new Date().getFullYear();
  return (
    <footer className="w-full lg:max-w-7xl mx-auto">

        <div className="flex">
          <div className="flex-grow flex flex-col">
            &copy; {jaar} Kenneth Haspeel
          </div>
          <div className="flex-grow flex flex-col">
          <span className="hidden sm:flex flex-wrap items-center mt-3 ml-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0 justify-end">
            {session && session.user ? (
              <>
                <p className="justify-end">
                  Ingelogd als{" "}
                  <Link
                    className="hover:cursor-pointer underline"
                    href="/identity/Profiel"
                  >
                    {session.user.voornaam} {session.user.naam}
                  </Link>
                </p>
              </>
            ) : (
              <p className="justify-end">Niet ingelogd</p>
            )}
          </span>
          <span className="sm:hidden flex mx-auto flex-wrap justify-end">
            <ThemeSwitch />
          </span>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
