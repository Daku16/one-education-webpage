import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 md:px-8 lg:px-12">
      <section className="mx-auto flex w-full max-w-2xl flex-col items-center rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
        <span className="mb-4 inline-flex rounded-full bg-rose-100 px-4 py-2 text-sm font-medium text-rose-700">
          Recurso no encontrado
        </span>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Este recurso no está disponible
        </h1>

        <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
          Es posible que el enlace haya cambiado o que el recurso ya no exista.
        </p>

        <Link
          href="/rea"
          className="mt-8 inline-flex items-center rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
        >
          Volver a la biblioteca REA
        </Link>
      </section>
    </main>
  );
}