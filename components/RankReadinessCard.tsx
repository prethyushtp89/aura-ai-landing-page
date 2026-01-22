"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export function RankReadinessCard() {
    const shouldReduceMotion = useReducedMotion();
    const [score, setScore] = useState(62);

    // Animate Score on Load
    useEffect(() => {
        if (shouldReduceMotion) {
            setScore(81);
            return;
        }

        const timeout = setTimeout(() => {
            let start = 62;
            const end = 81;
            const duration = 2000;
            const intervalTime = 50;
            const step = (end - start) / (duration / intervalTime);

            const timer = setInterval(() => {
                start += step;
                if (start >= end) {
                    setScore(end);
                    clearInterval(timer);
                } else {
                    setScore(Math.floor(start));
                }
            }, intervalTime);

            return () => clearInterval(timer);
        }, 800);

        return () => clearTimeout(timeout);
    }, [shouldReduceMotion]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-[300px] bg-white/90 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-[0_10px_40px_-10px_rgba(59,130,246,0.15)] relative overflow-hidden group select-none cursor-default"
        >
            {/* Subtle Gradient Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity" />

            {/* Header */}
            <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                    <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Rank Readiness</h3>
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-slate-900 tracking-tight">{score}%</span>
                        <span className="text-emerald-500 text-sm font-bold">↑</span>
                    </div>
                </div>
                <div className="p-2 bg-blue-50 rounded-xl">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                </div>
            </div>

            {/* Metrics Bars */}
            <div className="space-y-4 mb-6 relative z-10">
                {[
                    { label: "Accuracy", val: "92%", color: "bg-blue-500", w: "92%" },
                    { label: "Speed", val: "84%", color: "bg-cyan-500", w: "84%" },
                    { label: "Consistency", val: "78%", color: "bg-purple-500", w: "78%" }
                ].map((item, i) => (
                    <div key={i}>
                        <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
                            <span>{item.label}</span>
                            <span>{item.val}</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: item.w }}
                                transition={{ duration: 1.5, delay: 0.8 + (i * 0.2), ease: "easeOut" }}
                                className={`h-full rounded-full ${item.color}`}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Chips */}
            <div className="flex gap-2 mb-4 relative z-10">
                {["Physics", "Chemistry", "Math"].map((tag, i) => (
                    <span key={i} className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-100 px-2 py-1 rounded-md">
                        {tag}
                    </span>
                ))}
            </div>

            {/* Microline */}
            <div className="border-t border-slate-100 pt-3 text-[10px] text-slate-400 font-medium text-center relative z-10">
                Built for top ranks • Beta April 15
            </div>
        </motion.div>
    );
}
