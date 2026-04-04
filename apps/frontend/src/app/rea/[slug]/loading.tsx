export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 md:px-8 lg:px-12">
      <section className="mx-auto w-full max-w-5xl animate-pulse">
        <div className="mb-6 h-5 w-40 rounded bg-slate-200" />

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="h-64 w-full bg-slate-200 sm:h-72 md:h-80" />

          <div className="p-5 sm:p-6 md:p-8">
            <div className="mb-4 flex gap-2">
              <div className="h-7 w-24 rounded-full bg-slate-200" />
              <div className="h-7 w-24 rounded-full bg-slate-200" />
              <div className="h-7 w-24 rounded-full bg-slate-200" />
            </div>

            <div className="h-10 w-3/4 rounded bg-slate-200" />

            <div className="mt-4 space-y-3">
              <div className="h-4 w-full rounded bg-slate-200" />
              <div className="h-4 w-full rounded bg-slate-200" />
              <div className="h-4 w-5/6 rounded bg-slate-200" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}