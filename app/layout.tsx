import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Header from "./components/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Lazy Company",
  description: "Lazy Company Virtual HQ",
  icons: {
    icon: "/afbeeldingen/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseClasses = ''
  return (
    <html
      lang="nl-be"
      suppressHydrationWarning
    >
     
      <body className= {`${inter.className} bg-slate-100 dark:bg-slate-600`}>
         <Providers>
          <div className="flex h-full min-h-screen flex-col justify-between bg-slate-100 dark:bg-slate-600">
            <div className="flex sticky top-0 w-full lg:max-w-7xl mx-auto bg-slate-100 dark:bg-slate-600 dark:text-white p-2 rounded-b-lg">
              <Header />
            </div>

            <div className="flex-1 w-full lg:max-w-7xl mx-auto bg-slate-100 dark:bg-slate-600 dark:text-white z-0">{children}</div>
            <div className="flex sticky bottom-0 w-full lg:max-w-7xl mx-auto  bg-slate-100 dark:bg-slate-600 dark:text-white p-4 rounded-t-lg pt-2">
              <Footer />
            </div>
            <ToastContainer />
          </div>
              </Providers>
      </body>

    </html>
  );
}
