"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { subscribeToNewsletter } from "../../services/newsletter";

type NewsletterFormValues = {
  email: string;
};

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormValues>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: NewsletterFormValues) => {
    setStatus("idle");
    setMessage("");

    try {
      await subscribeToNewsletter(values.email);
      setStatus("success");
      setMessage("¡Gracias por suscribirte!");
      reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("No fue posible completar la suscripción. Inténtalo de nuevo.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 sm:flex-row sm:items-start"
    >
      <div className="w-full flex-1">
        <label htmlFor="newsletter-email" className="sr-only">
          Correo electrónico
        </label>

        <input
          id="newsletter-email"
          type="email"
          placeholder="Digita tu correo electrónico"
          className="h-14 w-full rounded-xl border border-white/10 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          {...register("email", {
            required: "El correo es obligatorio",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Ingresa un correo válido",
            },
          })}
        />

        {errors.email && (
          <p className="mt-2 text-sm text-rose-300">{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="h-14 rounded-xl bg-teal-600 px-6 text-sm font-semibold text-white transition hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Enviando..." : "Enviar"}
      </button>

      {status !== "idle" && message && (
        <p
          className={`w-full text-sm sm:mt-2 ${
            status === "success" ? "text-emerald-300" : "text-rose-300"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}