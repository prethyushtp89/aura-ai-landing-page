"use client";

import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronDown, Sparkles, Brain, Zap, Clock, Shield, Flame, Target, Users, Plus, Minus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTilt } from "@/hooks/useTilt";
import { useTypewriter } from "@/hooks/useTypewriter";
import { BreathingAura } from "@/components/BreathingAura";
import { VideoZoomSection } from "@/components/VideoZoomSection";
import { AuraParticles } from "@/components/AuraParticles";
import { RankBoostArc } from "@/components/RankBoostArc";
import { RankReadinessCard } from "@/components/RankReadinessCard";
import clsx from "clsx";

export default function Home() {
    const shouldReduceMotion = useReducedMotion();

    // Mouse tracking for cursor glow
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Hero Tilt Hook
    const { ref: tiltRef, handleMouseMove: handleTiltMove, handleMouseLeave: handleTiltLeave, style: tiltStyle } = useTilt<HTMLDivElement>();

    // Typewriter State
    const { displayedText: headlineText, isComplete: isHeadlineDone } = useTypewriter({
        text: "Crack JEE 2027 the Aura Way",
        speed: 40,
        startDelay: 500
    });

    const { displayedText: punchlineText2 } = useTypewriter({
        text: "Stop guessing. Start mastering.",
        speed: 35,
        startDelay: 2000
    });

    useEffect(() => {
        if (shouldReduceMotion) return;

        const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
            mouseX.set(clientX);
            mouseY.set(clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY, shouldReduceMotion]);

    const cursorGlow = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.08), transparent 80%)`;

    const SURVEY_URL = "https://tally.so/r/w7XjL0";

    return (
        <main className="relative w-full overflow-x-hidden bg-white text-slate-900 scroll-smooth selection:bg-blue-100 selection:text-blue-900">
            {/* Noise Overlay - Antigravity grain */}
            <div className="noise-overlay opacity-[0.03] mix-blend-multiply" />

            {/* Cursor Glow */}
            {!shouldReduceMotion && (
                <motion.div
                    className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
                    style={{ background: cursorGlow }}
                />
            )}

            {/* Navigation */}
            <nav className="fixed w-full z-50 top-0 px-6 py-4 flex justify-between items-center backdrop-blur-xl border-b border-slate-200/50 bg-white/70 supports-[backdrop-filter]:bg-white/60">
                <div className="font-bold text-xl tracking-tighter text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">Aura AI</span>
                </div>
                <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
                    <a href="#differentiators" className="hover:text-blue-600 transition-colors">Different</a>
                    <a href="#why" className="hover:text-blue-600 transition-colors">Why Aura</a>
                    <a href="#preview" className="hover:text-blue-600 transition-colors">Preview</a>
                </div>
                <div className="flex gap-4">
                    <a href="#batch" className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-blue-500/10">
                        Join Waitlist
                    </a>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-24 pb-12 lg:pt-32 border-b border-slate-100 overflow-hidden">

                {/* Visual Background Layers */}
                <BreathingAura />
                <div className="absolute inset-0 z-0">
                    <AuraParticles />
                </div>

                <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full isolate">

                    {/* TOP LEVEL RANK READINESS CARD - Overlay Z-50 */}
                    <div className="absolute top-1/2 -translate-y-1/2 right-4 lg:right-16 z-50 pointer-events-auto hidden md:block">
                        <RankReadinessCard />
                    </div>



                    {/* Hero Content */}
                    <div className="space-y-8 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-blue-100 backdrop-blur-md text-sm font-medium text-blue-600 shadow-sm"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Coming Soon • Beta April 15
                        </motion.div>

                        <div className="min-h-[180px] md:min-h-[240px] flex flex-col justify-center gap-3">
                            {/* HEADLINE */}
                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-slate-900 leading-[1.05]">
                                {headlineText}
                                {!isHeadlineDone && <span className="animate-pulse text-blue-500 ml-1">|</span>}
                            </h1>

                            {/* PUNCHLINE */}
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 leading-[1.2] pb-2">
                                {punchlineText2}
                                {isHeadlineDone && punchlineText2.length < 31 && <span className="animate-pulse text-purple-600 ml-1">|</span>}
                            </h2>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 2.5 }}
                            className="text-lg md:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal tracking-wide"
                        >
                            India’s most advanced Exam Mastery Engine. Built for top ranks.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 2.8 }}
                            className="flex flex-col gap-8"
                        >
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                {/* Primary CTA with Glow */}
                                <button className="group relative px-8 py-4 rounded-full bg-slate-900 text-white font-bold text-lg hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)] transition-all duration-300 overflow-hidden">
                                    <span className="relative z-10 flex items-center gap-2">
                                        Join Beta Waitlist
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>

                                <a
                                    href={SURVEY_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold text-lg hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm flex items-center justify-center"
                                >
                                    Take 2-minute Survey
                                </a>
                            </div>
                            <p className="text-sm text-slate-500 font-medium tracking-wide">
                                Built with feedback from <span className="text-slate-900 font-semibold">400+ JEE aspirants</span>
                            </p>
                        </motion.div>
                    </div>

                    {/* Hero Visual - Right Column (Rank Boost Engine) */}
                    <div className="relative flex flex-col items-center justify-center h-full min-h-[400px] lg:min-h-[600px] mt-12 lg:mt-0">

                        {/* The Rank Boost Arc Animation */}
                        <div className="absolute inset-0 z-10 w-full h-full">
                            <RankBoostArc />
                        </div>




                    </div>
                </div>
            </section>

            {/* NEW SECTION: Why Aura feels different (Signature Strip) */}
            <section id="differentiators" className="py-20 bg-slate-50 relative border-b border-slate-200">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-2">Why Aura feels different.</h2>
                            <p className="text-slate-500">Engineered for the 1% mindset.</p>
                        </div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-default shadow-sm">
                            <Users className="w-4 h-4 text-yellow-500" />
                            <span>Friend Leagues — Compete with friends, not strangers.</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="group relative p-8 rounded-3xl bg-white border border-slate-200 hover:border-red-200 hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300 overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Target className="w-24 h-24 text-red-500" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2 relative z-10">Never Repeat Mistakes</h3>
                            <p className="text-slate-600 text-sm leading-relaxed relative z-10">
                                Aura finds why you lose marks — and fixes it permanently using spaced repetition of your distinctive errors.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="group relative p-8 rounded-3xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Flame className="w-24 h-24 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2 relative z-10">Daily Next-Step Plan</h3>
                            <p className="text-slate-600 text-sm leading-relaxed relative z-10">
                                You’ll always know exactly what to do next. No confusion, just action tailored to your rank goals.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="group relative p-8 rounded-3xl bg-white border border-slate-200 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Zap className="w-24 h-24 text-purple-500" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2 relative z-10">Rank Boost Sprints</h3>
                            <p className="text-slate-600 text-sm leading-relaxed relative z-10">
                                14-day intensive challenges designed for real mock score improvement when you plateau.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Aura (Outcome Based) */}
            <section id="why" className="py-24 bg-white border-b border-slate-100">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Outcome Driven.</h2>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                            Stop wasting time on methods that don't increase your rank.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            {
                                title: "Confidence",
                                desc: "Walk into mocks knowing you can solve 80% of the paper.",
                                icon: <Shield className="w-6 h-6 text-emerald-500" />
                            },
                            {
                                title: "Accuracy",
                                desc: "Reduce negative marking by 45% in your first month.",
                                icon: <CheckCircle2 className="w-6 h-6 text-blue-500" />
                            },
                            {
                                title: "Speed",
                                desc: "Solve questions 30% faster with intuition paths.",
                                icon: <Zap className="w-6 h-6 text-yellow-500" />
                            },
                            {
                                title: "Clarity",
                                desc: "Know exactly what to study next.",
                                icon: <Brain className="w-6 h-6 text-purple-500" />
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-blue-100 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 text-center"
                            >
                                <div className="mb-4 bg-white w-12 h-12 rounded-xl flex items-center justify-center mx-auto shadow-sm">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Scroll Zoom Video Section (Antigravity Style) */}
            <div id="preview">
                <VideoZoomSection />
            </div>

            {/* JOIN BATCH FORM */}
            <section id="batch" className="relative py-24 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-900 to-slate-900 pointer-events-none" />
                <div className="container mx-auto px-4 max-w-5xl grid md:grid-cols-2 gap-16 items-center relative z-10">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter text-white">Join the JEE 2027 Batch.</h2>
                        <p className="text-slate-400 text-lg md:text-xl mb-8 leading-relaxed font-light">
                            Limited seats for the Alpha cohort. Secure your advantage before the rest of the country wakes up.
                        </p>

                        <div className="mt-8 bg-white/5 inline-block p-6 rounded-2xl border border-white/10 backdrop-blur-md">
                            <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-4">Beta Launch In</div>
                            <CountdownTimer targetDate="2026-04-15T10:00:00+05:30" />
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
                        <h3 className="text-xl font-semibold mb-6 text-white">Request Invitation</h3>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Full Name</label>
                                <input type="text" className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-medium text-white placeholder-slate-600" placeholder="Ex. Rahul Varma" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Email <span className="text-red-400">*</span></label>
                                <input type="email" required className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-medium text-white placeholder-slate-600" placeholder="rahul@example.com" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Target Year</label>
                                    <select className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-medium text-white appearance-none cursor-pointer">
                                        <option className="bg-slate-900">2026</option>
                                        <option className="bg-slate-900">2027</option>
                                        <option className="bg-slate-900">2028</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Struggle</label>
                                    <select className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-medium text-white appearance-none cursor-pointer">
                                        <option className="bg-slate-900">Concepts</option>
                                        <option className="bg-slate-900">Practice</option>
                                        <option className="bg-slate-900">Revision</option>
                                        <option className="bg-slate-900">Mocks</option>
                                        <option className="bg-slate-900">Time Mgmt</option>
                                    </select>
                                </div>
                            </div>
                            <button className="w-full bg-white text-slate-900 hover:bg-blue-50 font-bold py-4 rounded-xl mt-4 transition-colors">
                                Join Beta
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* FAQ & FOOTER */}
            <footer className="py-20 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto px-4 max-w-3xl flex-grow flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 tracking-tight">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {[
                            { q: "What is Aura AI?", a: "Aura AI is an exam mastery engine designed to boost confidence, accuracy, and mock performance for JEE aspirants." },
                            { q: "Is Aura AI only for JEE 2027?", a: "Aura is built primarily for JEE 2027, but serious aspirants from other batches can join too." },
                            { q: "When does the Beta start?", a: "Beta opens on April 15, 2026." },
                            { q: "How do I get early access?", a: "Join the waitlist and complete the 2-minute survey to get priority invites." },
                            { q: "Will Aura AI replace coaching?", a: "Aura AI complements coaching by making practice targeted and improvement-focused." },
                            { q: "Is Aura AI free during Beta?", a: "Early users get priority access and special benefits during the Beta phase." },
                            { q: "How is Aura different from other JEE apps?", a: "Aura focuses on mastery + consistency and helps you always know what to do next." },
                            { q: "Will Aura help with weak chapters?", a: "Yes, Aura is designed to systematically improve weak areas through mastery practice." },
                            { q: "Can I use Aura alongside school studies?", a: "Yes, Aura is built to fit into a student’s daily routine with focused practice." },
                            { q: "Will Aura work on mobile?", a: "Yes, Aura is designed to be mobile-first and easy to use anywhere." }
                        ].map((faq, i) => (
                            <FAQItem key={i} question={faq.q} answer={faq.a} />
                        ))}
                    </div>
                </div>

                <div className="w-full border-t border-slate-200 py-12 bg-white mt-20">
                    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
                        <div className="flex items-center gap-2 mb-4 md:mb-0">
                            <Sparkles className="w-4 h-4 text-blue-600" />
                            <span className="font-semibold text-slate-800">Aura AI Inc.</span>
                        </div>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Twitter</a>
                        </div>
                        <div className="mt-4 md:mt-0">
                            {/* Footer Text Removed */}
                        </div>
                    </div>
                </div>
            </footer>
        </main >
    );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            onClick={() => setIsOpen(!isOpen)}
            className="group bg-white border border-slate-200 rounded-2xl p-6 cursor-pointer hover:shadow-md hover:border-blue-200 transition-all"
        >
            <div className="flex justify-between items-center font-semibold text-lg text-slate-800 select-none">
                {question}
                <span className={clsx("transform transition-transform duration-300 text-slate-400", isOpen && "rotate-180")}>
                    <ChevronDown className="w-5 h-5" />
                </span>
            </div>
            <div className={clsx("overflow-hidden transition-all duration-300 ease-in-out font-normal text-slate-600", isOpen ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0")}>
                {answer}
            </div>
        </div>
    );
}

function CountdownTimer({ targetDate }: { targetDate: string }) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(targetDate) - +new Date();
            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        };

        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="flex gap-4 md:gap-8 text-white">
            {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
            ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                    <div className="text-2xl md:text-3xl font-bold font-mono tracking-tighter text-blue-400">
                        {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] md:text-xs uppercase tracking-widest text-slate-500 font-bold mt-1">
                        {item.label}
                    </div>
                </div>
            ))}
        </div>
    );
}
