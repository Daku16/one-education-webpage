// apps/frontend/src/types/contact.ts
import { z } from "zod";

export const contactSubjects = [
  "Implementar ONE en mi institución",
  "Recursos educativos",
  "Formación docente",
  "Investigación",
  "Alianzas",
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .min(3, "Por favor ingresa tu nombre completo")
    .max(120, "El nombre es demasiado largo"),

  email: z
    .string()
    .min(1, "El correo electrónico es obligatorio")
    .email("Ingresa un correo electrónico válido"),

  institution: z
    .string()
    .max(120, "El nombre de la institución es demasiado largo")
    .optional()
    .or(z.literal("")),

  message: z
    .string()
    .min(15, "Cuéntanos un poco más para poder ayudarte mejor")
    .max(1500, "El mensaje es demasiado largo"),

  phone: z
    .string()
    .min(7, "Ingresa un número de contacto válido")
    .max(30, "El número de contacto es demasiado largo"),

  country: z
    .string()
    .min(2, "Ingresa tu país")
    .max(80, "El nombre del país es demasiado largo"),

  subject: z.enum(contactSubjects, {
    errorMap: () => ({ message: "Selecciona el motivo de tu mensaje" }),
  }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;