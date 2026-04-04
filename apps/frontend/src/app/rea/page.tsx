import { getResources } from "@/src/services/resources";
import { ResourcesSection } from "@/src/components/resources/ResourcesSection";

export default async function ReaPage() {
  const resources = await getResources();
  
  return (
    <main className=" flex min-h-screen flex-col items-center justify-between p-24">
      <section className="mx-auto w-full max-w-7xl">
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10 md:mb-12">
          <span className="mb-4 inline-flex rounded-full bg-teal-100 px-3 py-1.5 text-xs font-medium text-teal-800 sm:px-4 sm:py-2 sm:text-sm">
            Biblioteca REA
          </span>

          <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Biblioteca de recursos educativos abiertos
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7 md:text-lg">
            Identifícate y explora recursos pensados para niños y docentes en
            primera infancia.
          </p>
        </div>

        <ResourcesSection resources={resources} />
      </section>
    </main>
  );
}