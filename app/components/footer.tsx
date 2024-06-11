"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ThemeSwitch from "./ThemeSwitcher";

const Footer = () => {
  const { data: session } = useSession();
  const jaar = new Date().getFullYear();
  return (
    <footer className="fixed bottom-0 left-0 z-20 w-full bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-1 dark:bg-slate-800">
      <div className="flex flex-auto max-w-6xl mx-auto">
        <div className="w-1/2  h-12 pt-3 dark:text-gray-400">
          &copy; {jaar} Kenneth Haspeel
        </div>
        <div className="w-1/2 h-12 pt-3 text-right ">
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
