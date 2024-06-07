import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "./components/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import Footer from "./components/footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lazy Company",
  description: "Lazy Company Virtual HQ",
  icons:{
    icon:"/Afbeeldingen/Algemeen/favicon-32x32.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl-be" className="dark">
      <body className={inter.className}>
        <Providers>
          <Header/>
          <main className="px-4 md:px-6">
            {children}
          </main>
          <Footer/>
          <ToastContainer/>
        </Providers>
        
        </body>
    </html>
  );
}
