"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Wrench, Zap, Code2, Bot } from "lucide-react";

export const topics = [
  {
    title: "Mecánica",
    icon: Wrench,
    color: "from-orange-400 to-amber-500",
    description:
      "Explora cómo se mueven las cosas usando piezas divertidas. Aprende a usar poleas para levantar objetos, palancas para hacer más fácil el esfuerzo, piñones que giran juntos y resortes que almacenan energía. ¡Construye mecanismos y descubre cómo funcionan los movimientos!",
    items: ["Poleas", "Palancas", "Piñones", "Resortes"],
  },
  {
    title: "Electrónica",
    icon: Zap,
    color: "from-yellow-400 to-orange-500",
    description:
      "Descubre la energía que da vida a tus proyectos. Aprende qué es el voltaje, cómo viaja la corriente, cómo los sensores detectan el mundo y cómo los motores hacen que todo se mueva. ¡Conecta, experimenta y enciende tus ideas!",
    items: ["Voltaje", "Corriente", "Sensores", "Motores"],
  },
  {
    title: "Programación",
    icon: Code2,
    color: "from-blue-400 to-indigo-500",
    description:
      "Aprende a darle instrucciones a las máquinas como si fueras un director. Usa algoritmos para resolver retos, variables para guardar información, bucles para repetir acciones y condicionales para tomar decisiones. ¡Convierte tus ideas en código!",
    items: ["Algoritmos", "Variables", "Bucles", "Condicionales"],
  },
  {
    title: "Robótica",
    icon: Bot,
    color: "from-emerald-400 to-teal-500",
    description:
      "Une mecánica, electrónica y programación para crear robots increíbles. Construye estructuras, controla el movimiento, supera desafíos y encuentra soluciones creativas. ¡Diseña robots que exploran, ayudan y aprenden!",
    items: ["Construcción", "Movimiento", "Resolución de problemas"],
  },
];

type StemCardsProps = {
  activeIndex?: number; // índice del pilar actual (0-3)
};

export default function StemCards({ activeIndex }: StemCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {topics.map((topic, index) => {
        const Icon = topic.icon;
        const isActive = activeIndex === undefined || activeIndex === index;

        return (
          <motion.div
            key={topic.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isActive ? 1 : 0.35,
              y: 0,
              scale: isActive ? 1.02 : 0.98,
            }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            className="h-full"
          >
            <Card className="h-full rounded-2xl shadow-lg border-0 overflow-hidden">
              <div className={`h-2 w-full bg-gradient-to-r ${topic.color}`} />

              <CardHeader className="space-y-3">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${topic.color} flex items-center justify-center text-white shadow-md`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <CardTitle className="text-xl font-bold">
                  {topic.title}
                </CardTitle>

                <CardDescription className="text-sm leading-relaxed">
                  {topic.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {topic.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs font-medium px-3 py-1 rounded-full bg-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}