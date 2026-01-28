"use client";

import { motion, useScroll, useTransform, useReducedMotion, useMotionTemplate } from "framer-motion";
import { useRef } from "react";
import { Play, Sparkles } from "lucide-react";
import { LoopingText } from "./LoopingText";

export function VideoZoomSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();

    // Track scroll progress of this specific section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Animation Transforms (mapped to scroll)
    // Scale zooms in as centering
    const scale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.85, 1.05, 0.95]);
    const opacity = useTransform(scrollYProgress, [0.2, 0.5], [0.85, 1]);
    const blurValue = useTransform(scrollYProgress, [0.1, 0.5], [0, 10]);
    const blur = useMotionTemplate`blur(${blurValue}px)`;

    // Parallax for background
    const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

    // Chip animation triggers
    const chipsOpacity = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);
    const chipsY = useTransform(scrollYProgress, [0.4, 0.55], [20, 0]);

    // Reduced motion overrides
    const finalScale = shouldReduceMotion ? 1 : scale;
    const finalOpacity = shouldReduceMotion ? 1 : opacity;
    const finalChipsOpacity = shouldReduceMotion ? 1 : chipsOpacity;
    const finalChipsY = shouldReduceMotion ? 0 : chipsY;

    return (
        <section
            ref={sectionRef}
            className="snap-section relative bg-slate-50 overflow-hidden flex flex-col items-center justify-center py-24 border-t border-slate-200"
        >
            {/* Background Aura (Parallax) - ADJUSTED FOR LIGHT MODE */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none opacity-50"
                style={{ y: shouldReduceMotion ? 0 : yBackground }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-gradient-to-tr from-blue-100 via-purple-100 to-cyan-100 rounded-full blur-[120px]" />
            </motion.div>

            {/* Intro Header - LIGHT MODE COLORS */}
            <div className="relative z-10 text-center mb-12 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 md:mb-8 tracking-tight">
                        See the Aura Way
                    </h2>
                    <LoopingText />
                </motion.div>
            </div>

            {/* Video Container - KEEP DARK FOR CONTRAST */}
            <motion.div
                className="relative z-10 w-full max-w-5xl px-4 md:px-8"
                style={{
                    scale: finalScale,
                    opacity: finalOpacity
                }}
            >
                <div className="group relative aspect-video w-full rounded-[2rem] overflow-hidden shadow-2xl bg-slate-900 border border-slate-200">
                    {/* Fallback / Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-md mb-4 border border-white/10 group-hover:scale-110 transition-transform">
                                <Play className="w-6 h-6 text-white ml-1" />
                            </div>
                            <p className="text-slate-400 font-medium">Aura Preview coming soon</p>
                        </div>
                    </div>

                    {/* Actual Video */}
                    <video
                        className="absolute inset-0 w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                        src="/aura-preview.mp4"
                        poster="/aura-video-poster.png"
                        autoPlay
                        muted
                        loop
                        playsInline
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Chips Overlay - LIGHT MODE ADJUSTED */}
                <motion.div
                    className="absolute -bottom-8 left-0 w-full flex justify-center"
                    style={{ opacity: finalChipsOpacity, y: finalChipsY }}
                >
                    <div className="flex flex-wrap justify-center gap-3 px-4">
                        {[
                            "Confidence Boost",
                            "Mastery Mode",
                            "Rank Focus",
                            "Speed + Accuracy",
                            "Zero Guessing"
                        ].map((chip, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg text-sm font-semibold text-slate-700 hover:scale-105 transition-transform cursor-default"
                            >
                                <Sparkles className="w-3 h-3 text-blue-500" />
                                {chip}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
