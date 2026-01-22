"use client";

import { motion, useReducedMotion } from "framer-motion";

export function BreathingAura() {
    const shouldReduceMotion = useReducedMotion();

    // Animation variants for the blobs
    const breathingVariant = {
        animate: {
            scale: [0.98, 1.06, 0.98],
            opacity: [0.45, 0.7, 0.45],
            transition: {
                duration: 10,
                ease: "easeInOut",
                repeat: Infinity,
            },
        },
        static: {
            scale: 1,
            opacity: 0.5,
        },
    };

    const driftVariant = {
        animate: {
            rotate: [0, 5, -5, 0],
            x: [0, 20, -20, 0],
            y: [0, -15, 15, 0],
            transition: {
                duration: 14,
                ease: "easeInOut",
                repeat: Infinity,
            },
        },
        static: {
            rotate: 0,
            x: 0,
            y: 0,
        },
    };

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            {/* Blob 1: Center Left (Blue/Cyan) */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full bg-gradient-to-r from-blue-300/30 to-cyan-300/30 blur-[100px]"
                variants={breathingVariant}
                animate={shouldReduceMotion ? "static" : "animate"}
                style={{ transformOrigin: "center" }}
            />

            {/* Blob 2: Center Right (Purple/Blue) */}
            <motion.div
                className="absolute top-1/3 right-1/4 w-[60vw] h-[60vw] rounded-full bg-gradient-to-l from-purple-300/30 to-blue-300/30 blur-[120px]"
                variants={breathingVariant}
                animate={shouldReduceMotion ? "static" : "animate"}
                transition={{ delay: 2 }} // Staggered breathing
            />

            {/* Drifting Overlay for Hue/Movement */}
            <motion.div
                className="absolute inset-0"
                variants={driftVariant}
                animate={shouldReduceMotion ? "static" : "animate"}
            >
                {/* Subtle third blob */}
                <div className="absolute bottom-1/4 left-1/3 w-[40vw] h-[40vw] rounded-full bg-blue-200/20 blur-[90px] mix-blend-overlay" />
            </motion.div>
        </div>
    );
}
