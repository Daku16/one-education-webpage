// apps/frontend/src/components/forms/ContactForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";

import { contactSchema, ContactFormValues, contactSubjects } from "../../types/contact";
import { sendContactMessage } from "../../services/contact";

export default function ContactForm() {
  const [serverState, setServerState] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      institution: "",
      message: "",
      phone: "",
      country: "",
      subject: undefined,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setServerState({ type: "idle", message: "" });

    try {
      await sendContactMessage(data);

      setServerState({
        type: "success",
        message:
          "Tu mensaje fue enviado correctamente. Muy pronto nos pondremos en contacto contigo.",
      });

      reset();
    } catch (error) {
      setServerState({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Ocurrió un error al enviar el mensaje. Inténtalo nuevamente.",
      });
    }
  };

  const inputClassName =
    "w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100";

  const labelClassName = "mb-2 block text-sm font-medium text-slate-700";
  const errorClassName = "mt-1 flex items-center gap-1 text-sm text-rose-600";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className={labelClassName}>
            Nombre completo
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className={inputClassName}
            placeholder="Escribe tu nombre completo"
          />
          {errors.name && (
            <p className={errorClassName}>
              <AlertCircle className="h-4 w-4" />
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelClassName}>
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={inputClassName}
            placeholder="tucorreo@institucion.edu"
          />
          {errors.email && (
            <p className={errorClassName}>
              <AlertCircle className="h-4 w-4" />
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={labelClassName}>
            Número de contacto
          </label>
          <input
            id="phone"
            type="text"
            {...register("phone")}
            className={inputClassName}
            placeholder="+57 300 000 0000"
          />
          {errors.phone && (
            <p className={errorClassName}>
              <AlertCircle className="h-4 w-4" />
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="institution" className={labelClassName}>
            Institución / Organización <span className="text-slate-400">(opcional)</span>
          </label>
          <input
            id="institution"
            type="text"
            {...register("institution")}
            className={inputClassName}
            placeholder="Nombre de tu institución"
          />
          {errors.institution && (
            <p className={errorClassName}>
              <AlertCircle className="h-4 w-4" />
              {errors.institution.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="country" className={labelClassName}>
            País <br /> <br />
          </label>
          <input
            id="country"
            type="text"
            {...register("country")}
            className={inputClassName}
            placeholder="Colombia"
          />
          {errors.country && (
            <p className={errorClassName}>
              <AlertCircle className="h-4 w-4" />
              {errors.country.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="subject" className={labelClassName}>
            Motivo del mensaje
          </label>
          <select
            id="subject"
            {...register("subject")}
            className={inputClassName}
            defaultValue=""
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            {contactSubjects.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.subject && (
            <p className={errorClassName}>
              <AlertCircle className="h-4 w-4" />
              {errors.subject.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClassName}>
            Mensaje
          </label>
          <textarea
            id="message"
            rows={6}
            {...register("message")}
            className={`${inputClassName} resize-none`}
            placeholder="Escribe aquí tu mensaje, cuéntanos cómo podemos ayudarte"
          />
          {errors.message && (
            <p className={errorClassName}>
              <AlertCircle className="h-4 w-4" />
              {errors.message.message}
            </p>
          )}
        </div>
      </div>

      {serverState.type === "success" && (
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
          <p>{serverState.message}</p>
        </div>
      )}

      {serverState.type === "error" && (
        <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <p>{serverState.message}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Enviar mensaje
          </>
        )}
      </button>
    </form>
  );
}