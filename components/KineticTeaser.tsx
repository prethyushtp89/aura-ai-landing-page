"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import clsx from "clsx";

const SLIDES = [
    { text: "JEE prep shouldn’t feel like guessing." },
    { text: "Too many resources." },
    { text: "Not enough clarity." },
    { text: "Same mistakes again", cursor: true },
    { text: "Mocks… but no rank movement", cursor: true },
    { text: "If this feels familiar —" },
    { text: "you’re not the problem", cursor: true },
    { text: "Something new is coming.", sub: "Not another app." },
    { text: "Aura AI." },
    { text: "India’s most advanced Exam Mastery Engine." },
    { text: "Built for top ranks.", sub: "Stop guessing. Start mastering." },
    {
        text: "Crack JEE 2027 the Aura Way.",
        sub: "Beta opens April 15, 2026 • Limited first wave invites"
    }
];

export function KineticTeaser() {
    const shouldReduceMotion = useReducedMotion();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (shouldReduceMotion) {
            setIndex(SLIDES.length - 1);
            return;
        }

        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % SLIDES.length);
        }, 1800); // 1.8s per slide -> ~21.6s loop

        return () => clearInterval(interval);
    }, [shouldReduceMotion]);

    const currentSlide = SLIDES[index];

    return (
        <div className="relative w-[380px] h-[220px] select-none cursor-default group">

            {/* BREATHING GLOW (Behind) */}
            <motion.div
                animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [0.95, 1.05, 0.95]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute inset-0 bg-blue-400/20 blur-[60px] rounded-full -z-10"
            />

            {/* GLASS CARD */}
            <div className="relative w-full h-full bg-white/70 backdrop-blur-3xl rounded-[32px] border border-white/60 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05),inset_0_1px_2px_rgba(255,255,255,0.8)] overflow-hidden flex flex-col items-center justify-center text-center p-8">

                {/* SUBTLE GRID TEXTURE */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:24px_24px]" />

                {/* NOISE */}
                <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply pointer-events-none" />

                {/* CONTENT AREA */}
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="flex flex-col items-center gap-3"
                        >
                            <h3 className={clsx(
                                "font-bold tracking-tight leading-snug",
                                index === SLIDES.length - 1 ? "text-2xl text-blue-600" : "text-xl",
                                (currentSlide.text === "Something new is coming." || currentSlide.text === "Aura AI.")
                                    ? "bg-clip-text text-transparent bg-[linear-gradient(110deg,#1e293b,45%,#94a3b8,55%,#1e293b)] bg-[length:250%_100%] animate-shimmer"
                                    : "text-slate-800"
                            )}>
                                {currentSlide.text}
                                {currentSlide.cursor && (
                                    <motion.span
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                        className="inline-block w-[2px] h-[1em] bg-blue-500 ml-1 align-middle"
                                    />
                                )}
                            </h3>

                            {currentSlide.sub && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className={clsx(
                                        "font-medium",
                                        index === SLIDES.length - 1 ? "text-[10px] uppercase tracking-widest text-slate-500 mt-2" : "text-xs text-slate-400 italic"
                                    )}
                                >
                                    {currentSlide.sub}
                                </motion.p>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* PROGRESS INDICATOR */}
                {!shouldReduceMotion && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                        {SLIDES.map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    backgroundColor: i === index ? "#3b82f6" : "#cbd5e1",
                                    scale: i === index ? 1.2 : 1
                                }}
                                className="w-1 h-1 rounded-full"
                            />
                        ))}
                    </div>
                )}

                {/* HORIZONTAL SCAN LINE (Looping) */}
                {!shouldReduceMotion && (
                    <motion.div
                        initial={{ top: "-10%", opacity: 0 }}
                        animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
                        transition={{
                            duration: 3,         // Slow scan
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatDelay: 18      // Wait for next loop
                        }}
                        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent blur-[1px] pointer-events-none z-30"
                    />
                )}
            </div>
        </div>
    );
}
