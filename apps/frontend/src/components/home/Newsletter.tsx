import { CheckCircle2 } from "lucide-react";
import NewsletterForm from "../forms/NewsletterForm";

const benefits = [
  "Recursos exclusivos",
  "Invitaciones a webinars",
  "Novedades pedagógicas",
];

export default function Newsletter() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#071633] text-white">
          <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:18px_18px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.10),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.08),transparent_30%)]" />

          <div className="relative grid gap-12 px-8 py-12 sm:px-12 sm:py-16 lg:grid-cols-[1.15fr_0.95fr] lg:items-center lg:px-16 lg:py-20">
            <div className="max-w-2xl">
              <h2 className="max-w-xl text-4xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Únete a nuestra
                <br />
                comunidad
                <br />
                educativa
              </h2>

              <p className="mt-8 max-w-xl text-lg leading-8 text-white/70">
                Recibe los mejores recursos, artículos de investigación y
                novedades directamente en tu bandeja de entrada.
              </p>

              <ul className="mt-8 space-y-5">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-center gap-3 text-base text-white/90 sm:text-lg"
                  >
                    <CheckCircle2 className="h-5 w-5 text-violet-400" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:flex lg:justify-end">
              <div className="w-full max-w-xl rounded-[2rem] border border-white/8 bg-white/[0.04] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:p-5">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}