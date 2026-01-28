"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const MESSAGES = [
  "You studied… but the marks didn’t follow.",
  "You knew the concept — still lost marks.",
  "Mocks feel busy, not directional.",
  "You’re working hard — but progress feels random.", // Updated line
  "Top rankers don’t feel this.", // needs bold
  "They don’t guess.",
  "They don’t repeat mistakes.",
  "They always know what to do next.",
  "This is where Aura AI begins." // needs bold + Aura AI highlight
];

export function LoopingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 3000); // 3 seconds per line

    return () => clearInterval(timer);
  }, []);

  const currentText = MESSAGES[index];
  const isLastLine = index === MESSAGES.length - 1;
  const isBoldLine = index === 4 || index === MESSAGES.length - 1; // "Top rankers..." is index 4

  return (
    <div className="h-10 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`text-lg md:text-xl text-slate-500 whitespace-nowrap ${isBoldLine ? "font-bold text-slate-700" : "font-medium"
            }`}
        >
          {isLastLine ? (
            <>
              This is where{" "}
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 font-bold pb-1">
                Aura AI
              </span>{" "}
              begins.
            </>
          ) : (
            currentText
          )}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
