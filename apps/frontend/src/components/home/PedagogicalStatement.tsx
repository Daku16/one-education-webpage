type PedagogicalStatementBlockquoteProps = {
  className?: string;
};

export function PedagogicalStatement({
  className = "",
}: PedagogicalStatementBlockquoteProps) {
  return (
    <section
      className={`rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-200 md:p-8 ${className}`}
    >
      <blockquote className="border-l-4 border-teal-700 pl-5">
        <p className="text-lg leading-8 text-neutral-800 md:text-xl">
          “A diferencia de muchos modelos internacionales, ONE Education propone
          una arquitectura pedagógica específica para la primera infancia, donde
          la ingeniería se convierte en un lenguaje para explorar el mundo.”
        </p>
      </blockquote>
    </section>
  );
}