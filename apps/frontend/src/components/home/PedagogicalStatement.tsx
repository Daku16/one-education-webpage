type PedagogicalStatementBlockquoteProps = {
  className?: string;
};

export function PedagogicalStatement({
  className = "",
}: PedagogicalStatementBlockquoteProps) {
  return (
    <section
      className={`rounded-[28px] bg-white p-4 shadow-sm ring-1 ring-neutral-200 sm:p-6 md:p-8 ${className}`}
    >
      <blockquote className="border-t-4 border-teal-700 pt-4 sm:border-t-0 sm:border-l-4 sm:pl-5 sm:pt-0">
        <p className="text-base leading-7 text-neutral-800 sm:text-lg sm:leading-8 md:text-xl">
          “A diferencia de muchos modelos internacionales, ONE Education propone
          una arquitectura pedagógica específica para la primera infancia, donde
          la ingeniería se convierte en un lenguaje para explorar el mundo.”
        </p>
      </blockquote>
    </section>
  );
}