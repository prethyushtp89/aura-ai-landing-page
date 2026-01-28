"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";

const signals = [
    "Accuracy stabilizing",
    "Speed variance detected",
    "Momentum rising",
    "Consistency leak spotted"
];

export function LivePrepSignal() {
    const [index, setIndex] = useState(0);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        if (shouldReduceMotion) return;

        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % signals.length);
        }, 2500);

        return () => clearInterval(timer);
    }, [shouldReduceMotion]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute top-28 left-4 md:left-8 z-30 pointer-events-none"
        >
            <div className="relative overflow-hidden rounded-full bg-white/60 backdrop-blur-md border border-white/50 shadow-lg shadow-blue-500/5 px-4 py-2 flex items-center gap-3 w-fit">

                {/* Visual Indicator */}
                <div className="relative flex h-2.5 w-2.5 items-center justify-center">
                    {!shouldReduceMotion && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    )}
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </div>

                <div className="flex flex-col gap-0.5">
                    {/* Header */}
                    <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase leading-none">
                        Prep Signal • Live
                    </div>

                    {/* Rotating Text */}
                    <div className="h-4 relative w-[140px]">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.3 }}
                                className="text-xs font-semibold text-slate-700 absolute inset-0 truncate"
                            >
                                {signals[index]}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Subtle Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 mix-blend-overlay pointer-events-none" />
            </div>
        </motion.div>
    );
}
