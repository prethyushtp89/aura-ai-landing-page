"use client";

import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

interface UseTypewriterProps {
    text: string;
    speed?: number;
    startDelay?: number;
    onComplete?: () => void;
}

export function useTypewriter({
    text,
    speed = 40,
    startDelay = 0,
    onComplete
}: UseTypewriterProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [isStarted, setIsStarted] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        if (shouldReduceMotion) {
            setDisplayedText(text);
            setIsComplete(true);
            onComplete?.();
            return;
        }

        const startTimeout = setTimeout(() => {
            setIsStarted(true);
        }, startDelay);

        return () => clearTimeout(startTimeout);
    }, [startDelay, shouldReduceMotion, text, onComplete]);

    useEffect(() => {
        if (!isStarted || shouldReduceMotion) return;

        let currentIndex = 0;
        const intervalId = setInterval(() => {
            if (currentIndex >= text.length) {
                clearInterval(intervalId);
                setIsComplete(true);
                onComplete?.();
                return;
            }

            setDisplayedText(text.slice(0, currentIndex + 1));
            currentIndex++;
        }, speed);

        return () => clearInterval(intervalId);
    }, [isStarted, text, speed, shouldReduceMotion, onComplete]);

    return { displayedText, isComplete, isStarted };
}
