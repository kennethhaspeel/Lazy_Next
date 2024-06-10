import PaswoordVergetenForm from "./form";

const PaswoordVergetenPage = () => {
  return (
    <section className="mt-6 mx-auto max-w-5xl">
      <div className="grid grid-cols-1 place-items-center items-center">
        <div className="py-2">
          <h2>Paswoord vergeten</h2>
        </div>

        <div className="flex items-center justify-center flex-col">
          <PaswoordVergetenForm />
        </div>
      </div>
    </section>
  );
};

export default PaswoordVergetenPage;
