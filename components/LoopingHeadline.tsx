"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

const phrases = [
    "Crack JEE 2027 the Aura Way",
    "Stop guessing. Start mastering.",
    "Build rank momentum."
];

export function LoopingHeadline() {
    const [textIndex, setTextIndex] = useState(0);
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const text = phrases[textIndex];

        // Typing animation
        const controls = animate(count, isDeleting ? 0 : text.length, {
            type: "tween",
            duration: isDeleting ? 0.8 : 2.5, // Faster delete, smoother type
            ease: isDeleting ? "easeInOut" : "linear",
            onUpdate: (latest) => {
                setDisplayText(text.slice(0, Math.round(latest)));
            },
            onComplete: () => {
                // Pause before next action
                setTimeout(() => {
                    if (isDeleting) {
                        setIsDeleting(false);
                        setTextIndex((prev) => (prev + 1) % phrases.length);
                    } else {
                        setIsDeleting(true);
                    }
                }, isDeleting ? 300 : 2000); // Short pause after delete, long pause after type
            }
        });

        return () => controls.stop();
    }, [textIndex, isDeleting, count]);

    return (
        <span className="inline-block min-h-[1.1em]">
            {displayText}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="inline-block ml-1 w-[3px] h-[0.9em] bg-blue-500 align-middle mb-1"
            />
        </span>
    );
}
