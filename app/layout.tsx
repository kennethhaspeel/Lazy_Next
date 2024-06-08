import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Header from "./components/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import Footer from "./components/footer";


export const metadata: Metadata = {
  title: "Lazy Company",
  description: "Lazy Company Virtual HQ",
  icons:{
    icon:"/Afbeeldingen/Algemeen/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl-be" suppressHydrationWarning>
      <body className="dark:bg-slate-800">
        <Providers>
          <Header/>
          <div className=" flex flex-auto h-screen max-w-7xl mx-auto">
            {children}
          </div>
          <Footer/>
          <ToastContainer/>
        </Providers>
        </body>
    </html>
  );
}
