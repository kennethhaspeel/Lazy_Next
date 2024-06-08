import Link from "next/link"

export default function GeenToegang() {
    return (
        <section className="flex flex-col gap-12 items-center">
            <h1 className="text-5xl">Geen toegang</h1>
            <p className="text-3xl max-w-2xl text-center">
                U bent ingelogd maar hebt geen toegang tot deze pagina
            </p>
            <Link href="/" className="text-3xl underline">Return to Home Page</Link>
        </section>
    )
}