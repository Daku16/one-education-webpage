// apps/frontend/src/app/contacto/page.tsx
import {
  MessageCircle,
  School,
  BookOpen,
  GraduationCap,
  FlaskConical,
  Handshake,
  Rocket,
} from "lucide-react";
import ContactForm from "../../components/forms/ContactForm";

const contactReasons = [
  {
    icon: School,
    title: "Implementar la metodología ONE en tu institución educativa",
  },
  {
    icon: BookOpen,
    title: "Acceder a recursos educativos abiertos",
  },
  {
    icon: GraduationCap,
    title: "Participar en formación docente y talleres",
  },
  {
    icon: Rocket,
    title: "Desarrollar proyectos STEAM para la primera infancia",
  },
  {
    icon: FlaskConical,
    title: "Colaborar en investigación educativa",
  },
  {
    icon: Handshake,
    title: "Generar alianzas académicas o institucionales",
  },
];

export default function ContactoPage() {
  return (
    <main className="bg-white text-slate-900 min-h-screen flex flex-col items-center pt-16 space-y-8">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.10),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.08),_transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="space-y-8">

              <div className="space-y-5">
                <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
                  Construyamos juntos el futuro de la educación
                </h1>

                <div className="inline-flex items-center gap-4 rounded-[24px] border border-emerald-100 bg-white px-5 py-4 shadow-sm">
                  <div className="relative h-16 w-16">
                    <img
                      src="/One.png"
                      alt="ONE saludando"
                      className="h-16 w-16 rounded-full object-cover ring-2 ring-emerald-200"
                    />
                    <span className="absolute -top-2 left-10 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-emerald-700 shadow ring-1 ring-emerald-100">
                      ¡Hola!
                    </span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
                      ONE te saluda
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      Estamos felices de escucharte
                    </p>
                  </div>
                </div>

                <p className="max-w-2xl text-lg leading-8 text-slate-600">
                  En ONE Education creemos que la innovación educativa nace del
                  encuentro entre educadores, investigadores, escuelas y comunidades.
                </p>

                <p className="max-w-2xl text-base leading-7 text-slate-600">
                  Si deseas conocer más sobre nuestra metodología, implementar ONE en
                  tu institución, colaborar en investigación educativa o acceder a
                  nuestros recursos abiertos, estaremos felices de escucharte.
                </p>

                <p className="max-w-2xl text-base leading-7 text-slate-600">
                  Cada mensaje es una oportunidad para seguir construyendo una educación
                  donde la curiosidad, la ingeniería y la creatividad formen parte del
                  aprendizaje desde la primera infancia.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    ¿En qué podemos ayudarte?
                  </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {contactReasons.map((item) => {
                    const Icon = item.icon;

                    return (
                      <article
                        key={item.title}
                        className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                      >
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="text-sm font-semibold leading-6 text-slate-900">
                          {item.title}
                        </h3>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>

            <aside className="lg:sticky lg:top-24">
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl lg:p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-slate-900">
                    Formulario de contacto
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Completa tus datos y cuéntanos cómo podemos ayudarte.
                  </p>
                </div>

                <ContactForm />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}