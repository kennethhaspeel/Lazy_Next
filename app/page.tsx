
import Image from "next/image";
import banner from "./afbeeldingen/banner.png";


export default async function Home() {
  // useEffect(() => {
  //   if ("serviceWorker" in navigator) {
  //     navigator.serviceWorker
  //       .register("/serviceworker.js")
  //       .then((registration) => console.log("scope is: ", registration.scope));
  //   }
  // }, []);
  return (
    <>
      <main className="flex-1 w-full lg:max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-col-reverse">
          <div className="flex justify-center items-center">
            <Image src={banner} alt="banner" placeholder="blur" />
          </div>
          <div>
            <p className="mt-6 mb-6 text-3xl text-center dark:text-white">
              Welkom bij Lazy Company
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
