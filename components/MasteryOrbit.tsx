"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

export function MasteryOrbit() {
    const shouldReduceMotion = useReducedMotion();
    const [statIndex, setStatIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const stats = [
        { text: "Accuracy", color: "text-blue-500", bg: "bg-blue-500" },
        { text: "Speed", color: "text-amber-500", bg: "bg-amber-500" },
        { text: "Confidence", color: "text-emerald-500", bg: "bg-emerald-500" }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setStatIndex((prev) => (prev + 1) % stats.length);
        }, 2500);
        return () => clearInterval(timer);
    }, []);

    // Animation Config
    const ORBIT_DURATION_NORMAL = 12;
    const ORBIT_DURATION_HOVER = 6;

    const BREATH_DURATION = 4;

    return (
        <motion.div
            className="relative w-48 h-48 flex items-center justify-center cursor-default"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
        >
            {/* Core Glow */}
            <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full" />

            {/* Breathing Mastery Ring */}
            <motion.div
                className="absolute inset-4 rounded-full border border-slate-200/60"
                animate={shouldReduceMotion ? {} : {
                    scale: isHovered ? 1.05 : [1, 1.03, 1],
                    borderColor: isHovered ? "rgba(59, 130, 246, 0.3)" : "rgba(226, 232, 240, 0.6)",
                    boxShadow: isHovered ? "0 0 20px rgba(59, 130, 246, 0.1)" : "none"
                }}
                transition={{
                    duration: BREATH_DURATION,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Orbiting Dots Container */}
            <motion.div
                className="absolute inset-0"
                animate={shouldReduceMotion ? {} : { rotate: 360 }}
                transition={{
                    duration: isHovered ? ORBIT_DURATION_HOVER : ORBIT_DURATION_NORMAL,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                {/* Dot 1 */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />

                {/* Dot 2 */}
                <div className="absolute bottom-8 right-8 w-2 h-2 bg-purple-400 rounded-full blur-[1px]" />

                {/* Dot 3 */}
                <div className="absolute bottom-8 left-8 w-2 h-2 bg-cyan-400 rounded-full blur-[1px]" />
            </motion.div>

            {/* Central Stat Chip */}
            <div className="relative z-10 bg-white/80 backdrop-blur-md border border-slate-100 px-4 py-2 rounded-full shadow-lg min-w-[110px] text-center flex items-center justify-center gap-2 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={statIndex}
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -15, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-1.5"
                    >
                        <div className={`w-1.5 h-1.5 rounded-full ${stats[statIndex].bg}`} />
                        <span className={`text-sm font-bold ${stats[statIndex].color}`}>
                            {stats[statIndex].text}
                        </span>
                        <span className={`text-[10px] font-bold ${stats[statIndex].color} ml-0.5`}>↑</span>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Satellite Ring (Outer faint one) */}
            <motion.div
                className="absolute inset-0 rounded-full border border-dashed border-slate-200/40"
                animate={shouldReduceMotion ? {} : { rotate: -360 }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        </motion.div>
    );
}
