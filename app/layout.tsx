import type { Metadata , Viewport} from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Header from "./components/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
//import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });
const APP_NAME = "Lazy Company";
const APP_DEFAULT_TITLE = "Lazy Company";
const APP_TITLE_TEMPLATE = "%s";
const APP_DESCRIPTION = "Lazy Company Virtual HQ";
export const metadata: Metadata = {
  applicationName: APP_NAME,
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  title: "Lazy Company",
  icons: {
    icon: "/afbeeldingen/favicon.ico",
  },
};
export const viewport: Viewport = {
  themeColor: "#0057D1",
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
              {/* <script>
              const registerServiceWorker = async () => {
            if ("serviceWorker" in navigator) {
                try {
                    const registration = await navigator.serviceWorker.register("/serviceworker.js", {
                        scope: "/",
                    });
                    if (registration.installing) {
                        console.log("Service worker installing");
                    } else if (registration.waiting) {
                        console.log("Service worker installed");
                    } else if (registration.active) {
                        console.log("Service worker active");
                    }
                } catch (error) {
                    console.error(`Registration failed with ${error}`);
                }
            }
        };
        registerServiceWorker();
              </script> */}
      </body>

    </html>
  );
}
