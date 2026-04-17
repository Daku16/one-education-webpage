import Image from "next/image";
import Link from "next/link";

export default function AboutReaCta() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950 to-slate-900 p-8 shadow-2xl">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="inline-block bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-sm font-semibold tracking-[0.16em] text-transparent">
              Recursos Educativos Abiertos
            </span>

            <h2 className="max-w-3xl mt-4 text-4xl font-bold leading-tight text-white">
              ¿Quieres aprender más sobre STEAM para transformar tu práctica pedagógica?
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              Ingresa a nuestra biblioteca de recursos educativos abiertos diseñados para
              acompañar la formación integral y la innovación pedagógica.
            </p>

            <Link
              href="/rea"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-teal-600 px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-teal-700"
            >
              Ingresa aquí
            </Link>
          </div>

          <div className="relative lg:col-span-5">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm" />
              <div className="absolute inset-0 opacity-70">
                <div className="absolute inset-0 rounded-full bg-teal-500/20 blur-3xl" />
                <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
              </div>

              <div className="relative z-10 flex items-center justify-center p-8">
                <div className="relative">
                  <div className="about-breath-ring" />
                  <div className="about-character">
                    <div className="about-wave-arm" />
                    <Image
                      src="/One.png"
                      alt="Personaje ONE avanzando"
                      width={180}
                      height={200}
                      className="w-32 sm:w-[140px]"
                    />
                  </div>
                  <div className="about-bubble">¡Bienvenido!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}