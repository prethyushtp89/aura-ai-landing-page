"use client";

import { useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";

export function useTilt<T extends HTMLElement>() {
    const ref = useRef<T>(null);
    const shouldReduceMotion = useReducedMotion();

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring configuration for smooth movement
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-8deg", "8deg"]);

    // For glow effect
    const glowX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const glowY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

    const handleMouseMove = useCallback((e: React.MouseEvent<T>) => {
        if (!ref.current || shouldReduceMotion) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;

        const xPct = mouseXFromCenter / width;
        const yPct = mouseYFromCenter / height;

        x.set(xPct);
        y.set(yPct);
    }, [x, y, shouldReduceMotion]);

    const handleMouseLeave = useCallback(() => {
        x.set(0);
        y.set(0);
    }, [x, y]);

    // Cleanup or additional side effects if needed
    useEffect(() => {
        if (shouldReduceMotion) {
            x.set(0);
            y.set(0);
        }
    }, [shouldReduceMotion, x, y]);

    return {
        ref,
        handleMouseMove,
        handleMouseLeave,
        style: {
            rotateX: shouldReduceMotion ? 0 : rotateX,
            rotateY: shouldReduceMotion ? 0 : rotateY,
            // Pass minimal CSS variables if needed for advanced styling
            "--mx": glowX,
            "--my": glowY,
        }
    };
}
