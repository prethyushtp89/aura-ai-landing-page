"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

export function RankBoostArc() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const [score, setScore] = useState(112);

    // Score Animation
    useEffect(() => {
        if (shouldReduceMotion) return;
        const interval = setInterval(() => {
            setScore(prev => {
                if (prev >= 168) return 112; // Loop
                return prev + 1;
            });
        }, 100); // Speed of score count
        return () => clearInterval(interval);
    }, [shouldReduceMotion]);

    // Canvas Particle Arc
    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let animationFrameId: number;
        let time = 0;

        // Constants
        const PARTICLE_COUNT = 150;
        const ARC_CENTER_X_RATIO = 0.5;
        const ARC_CENTER_Y_RATIO = 0.6;
        const ARC_RADIUS = 200;
        const MOUSE_INFLUENCE_DIST = 100;

        const mouse = { x: -1000, y: -1000 };

        class Particle {
            angle: number; // Position along the arc (radians)
            speed: number;
            radiusOffset: number;
            size: number;
            color: string;
            opacity: number;

            constructor() {
                // Start somewhere on the arc: PI (180 deg) to 2*PI (360 deg) -> top half semicircle
                // Let's make it an upward curve: PI/4 to 3PI/4 ??
                // Let's do a "Growth" curve: bottom-left to top-right.
                this.angle = Math.PI * 0.8 + Math.random() * Math.PI * 0.9;
                this.speed = 0.002 + Math.random() * 0.004;
                this.radiusOffset = (Math.random() - 0.5) * 30; // Thickness of arc
                this.size = Math.random() * 2 + 0.5;
                this.opacity = Math.random() * 0.6 + 0.2;

                const colors = [
                    "rgba(59, 130, 246, ", // Blue
                    "rgba(34, 211, 238, ", // Cyan
                    "rgba(168, 85, 247, ", // Purple
                ];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update(t: number) {
                // Move along the arc
                this.angle -= this.speed; // Move clockwise? Or counter?

                // Reset if out of bounds (visual loop)
                if (this.angle < 0) {
                    this.angle = Math.PI * 1.8;
                }

                // Breathing
                const breath = Math.sin(t * 0.005) * 5;

                // Calculate Position
                const cx = width * ARC_CENTER_X_RATIO;
                const cy = height * ARC_CENTER_Y_RATIO;
                const r = ARC_RADIUS + this.radiusOffset + breath;

                let tx = cx + Math.cos(this.angle) * r;
                let ty = cy - Math.sin(this.angle) * r * 0.6; // Flatten circle to ellipse-ish arc

                // Cursor Interaction (Bend towards cursor)
                if (mouse.x > 0) {
                    const dx = mouse.x - tx;
                    const dy = mouse.y - ty;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < MOUSE_INFLUENCE_DIST) {
                        tx += dx * 0.1;
                        ty += dy * 0.1;
                    }
                }

                return { x: tx, y: ty };
            }

            draw(ctx: CanvasRenderingContext2D, pos: { x: number, y: number }) {
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color + this.opacity + ")";
                ctx.fill();
            }
        }

        let particles: Particle[] = [];

        const init = () => {
            width = container.offsetWidth;
            height = container.offsetHeight;
            canvas.width = width * window.devicePixelRatio;
            canvas.height = height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            // Draw guiding faint Line
            const cx = width * ARC_CENTER_X_RATIO;
            const cy = height * ARC_CENTER_Y_RATIO;
            ctx.beginPath();
            ctx.ellipse(cx, cy, ARC_RADIUS, ARC_RADIUS * 0.6, 0, Math.PI, 0); // Bottom half?
            // Let's just draw particles for now, cleaner.

            time++;
            particles.forEach(p => {
                const pos = p.update(time);
                p.draw(ctx, pos);
            });

            if (!shouldReduceMotion) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        const handleResize = () => {
            init();
            if (shouldReduceMotion) animate(); // draw once
        }

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container?.getBoundingClientRect();
            if (rect) {
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
            }
        };

        init();
        if (!shouldReduceMotion) animate();
        else {
            // render static
            particles.forEach(p => {
                const pos = p.update(0);
                p.draw(ctx, pos);
            });
        }

        window.addEventListener("resize", handleResize);
        container.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("resize", handleResize);
            container.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };

    }, [shouldReduceMotion]);

    // Floating Chips Cycle
    const [activeChip, setActiveChip] = useState(0);
    const chips = ["Accuracy ↑", "Speed ↑", "Confidence ↑"];
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveChip(prev => (prev + 1) % chips.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div ref={containerRef} className="relative w-full h-full min-h-[500px] flex items-center justify-center select-none pointer-events-auto">
            {/* Canvas Layer Only - Widgets removed to prevent overlap with RankReadinessCard */}
            <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-80" />
        </div>
    );
}
