import Image from "next/image";
import banner from "./afbeeldingen/banner.png";

export default async function Home() {
  return (
    <main className="p-2 mx-auto">
      <div className="flex flex-col sm:flex-col-reverse">
        <div>
          <Image src={banner} alt="banner" placeholder="blur" />
        </div>
        <div>
          <p className="mt-6 mb-6 text-3xl text-center dark:text-white">
            Welkom bij Lazy Company Virtual HQ
          </p>
        </div>
      </div>
    </main>
  );
}
