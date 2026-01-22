"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export function AuraParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let animationFrameId: number;

        // --- CONSTANTS & CONFIGURATION ---
        const CONFIG = {
            PARTICLE_COUNT_DESKTOP: 1000,
            PARTICLE_COUNT_MOBILE: 400,

            // Ring / Halo Config
            RING_RADIUS_MEAN: 280, // Target radius for the main band
            RING_RADIUS_SPREAD: 120, // Spread of the band

            // Physics / Motion
            CURSOR_LAG: 0.08,        // How fast center follows cursor (0-1)
            SWIRL_FORCE: 0.003,      // Rotational strength
            RADIAL_SPRING: 0.0008,   // Pull strength towards ring radius
            FRICTION: 0.95,          // Damping (0-1)
            FRAME_BREATHING_SPEED: 0.008, // Speed of breathing cycle (~8-10s)

            // Interaction
            MOUSE_INFLUENCE_RADIUS: 600, // Area where swirl is active

            // Colors (Antigravity Palette: Blue, Cyan, Purple)
            COLORS: [
                "rgba(59, 130, 246, ", // Blue-500
                "rgba(34, 211, 238, ", // Cyan-400
                "rgba(168, 85, 247, ", // Purple-500
                "rgba(139, 92, 246, ", // Violet-500
            ]
        };

        // State
        let time = 0;
        const mouse = { x: -1000, y: -1000 };
        const center = { x: 0, y: 0 }; // Smoothed follower center

        // Particle System
        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: string;
            opacity: number;
            depth: number; // 0.5 (far) to 1.5 (near)

            // Target characteristics
            angle: number;
            targetRadius: number;

            constructor(w: number, h: number) {
                // Spawn randomly on screen initially
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * 1;
                this.vy = (Math.random() - 0.5) * 1;

                this.depth = 0.5 + Math.random(); // 0.5 to 1.5

                // Size depends on depth (closer = bigger)
                this.size = (Math.random() * 2 + 1) * this.depth * 0.8;

                // Color & Opacity
                this.color = CONFIG.COLORS[Math.floor(Math.random() * CONFIG.COLORS.length)];
                this.opacity = (Math.random() * 0.4 + 0.1) * this.depth; // Closer = bright

                // Assign a "home" radius in the ring band
                // Gaussian-like distribution around Mean
                const rCalc = CONFIG.RING_RADIUS_MEAN + (Math.random() - 0.5) * CONFIG.RING_RADIUS_SPREAD * 2;
                this.targetRadius = Math.max(50, rCalc); // Min 50px radius
                this.angle = Math.random() * Math.PI * 2;
            }

            update(t: number, cx: number, cy: number, breathingFactor: number) {
                // 1. Calculate vector to smoothed center (cx, cy)
                const dx = this.x - cx;
                const dy = this.y - cy;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Avoid division by zero
                if (dist < 1) return;

                const dxNorm = dx / dist;
                const dyNorm = dy / dist;

                // 2. Breathing applied to target radius
                // "Inhale" = radius shrinks slightly? Or expands?
                // Let's say expands. scale 0.95 to 1.05
                const currentTargetRadius = this.targetRadius * breathingFactor;

                // 3. Radial Force (Spring to Ring)
                // Pull particle towards its target radius
                const radialDistError = dist - currentTargetRadius;
                const radialForce = radialDistError * -CONFIG.RADIAL_SPRING * this.depth; // Depth affects responsiveness

                this.vx += dxNorm * radialForce;
                this.vy += dyNorm * radialForce;

                // 4. Tangential Force (Swirl)
                // Perpendicular vector (-y, x)
                // Force strongest when near the ring
                const swirlDirectonX = -dyNorm;
                const swirlDirectonY = dxNorm;

                // Modulate swirl by distance (less swirl very far out)
                const swirlPower = CONFIG.SWIRL_FORCE * this.depth;

                this.vx += swirlDirectonX * swirlPower;
                this.vy += swirlDirectonY * swirlPower;

                // 5. Physics Integration + Friction
                this.vx *= CONFIG.FRICTION;
                this.vy *= CONFIG.FRICTION;

                this.x += this.vx;
                this.y += this.vy;
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
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

            // Initial Center: Middle of right side? Or center of screen?
            // User requested center tracks cursor. Initial state should be "neutral".
            // Let's start center at 60% width, 50% height (Right side Hero)
            center.x = width * 0.6;
            center.y = height * 0.5;

            // Don't reset mouse here, let it be -1000

            const count = window.innerWidth < 768 ? CONFIG.PARTICLE_COUNT_MOBILE : CONFIG.PARTICLE_COUNT_DESKTOP;

            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push(new Particle(width, height));
            }
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            time += 1;

            // 1. Update Smoothed Center (Lag)
            // If mouse is active, lerp center towards mouse
            // If mouse inactive, lerp center towards default position
            let targetX, targetY;

            if (mouse.x > -100 && mouse.x < width + 100 && mouse.y > -100 && mouse.y < height + 100) {
                targetX = mouse.x;
                targetY = mouse.y;
            } else {
                // Default drift center when no mouse
                // Drift slightly in a figure-8 or circle
                const driftTime = time * 0.005;
                targetX = (width * 0.6) + Math.sin(driftTime) * 50;
                targetY = (height * 0.5) + Math.cos(driftTime * 0.7) * 30;
            }

            center.x += (targetX - center.x) * CONFIG.CURSOR_LAG;
            center.y += (targetY - center.y) * CONFIG.CURSOR_LAG;

            // 2. Global Breathing Factor
            // Cycle 0 to 2PI. Sin gives -1 to 1.
            // Map to 0.96 to 1.04
            const breathCycle = Math.sin(time * CONFIG.FRAME_BREATHING_SPEED);
            const breathingFactor = 1 + (breathCycle * 0.06);

            // 3. Update & Draw Particles
            particles.forEach(p => {
                p.update(time, center.x, center.y, breathingFactor);
                p.draw(ctx);
            });

            if (!shouldReduceMotion) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        // --- HANDLERS ---
        const handleResize = () => {
            init();
            if (shouldReduceMotion) {
                /* static render */
                particles.forEach(p => { p.draw(ctx); });
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container?.getBoundingClientRect();
            if (rect) {
                if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
                    mouse.x = e.clientX - rect.left;
                    mouse.y = e.clientY - rect.top;
                } else {
                    // Leave it last known or reset? Resetting provides cleaner "exit" behavior
                    // but leaving it creates a "look at where I left" feel. 
                    // Antigravity standard: reset on leave.
                    mouse.x = -1000;
                    mouse.y = -1000;
                }
            }
        };

        init();
        if (!shouldReduceMotion) {
            animate();
        } else {
            // Initial static draw
            particles.forEach(p => p.draw(ctx));
        }

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [shouldReduceMotion]);

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Optional: Vignette or Soft masking if needed, but keeping it simple as requested */}
            <canvas
                ref={canvasRef}
                className="block w-full h-full"
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
}
