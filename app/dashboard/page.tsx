"use client";

import { motion } from "framer-motion";
import { 
  Target, 
  Flame, 
  TrendingUp, 
  BrainCircuit, 
  Clock, 
  Zap, 
  ChevronRight,
  Play,
  RotateCcw,
  BookOpen,
  MessageSquare,
  FileText
} from "lucide-react";
import { useEffect, useState } from "react";
import { clsx } from "clsx";

// A sleek animated progress bar
function ProgressBar({ 
  progress, 
  colorClass = "bg-orange-500",
  shadowClass = "shadow-[0_0_15px_rgba(249,115,22,0.4)]",
  delay = 0 
}: { 
  progress: number; 
  colorClass?: string; 
  shadowClass?: string;
  delay?: number;
}) {
  return (
    <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/50">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
        className={clsx("h-full rounded-full relative", colorClass, shadowClass)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 w-full" />
      </motion.div>
    </div>
  );
}

// Stats Card Container wrapper
function StatCard({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={clsx("bg-zinc-950/50 border border-zinc-800/80 rounded-2xl p-5 backdrop-blur-md relative overflow-hidden", className)}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      {children}
    </motion.div>
  );
}

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // Avoid hydration mismatch on initial render

  return (
    <div className="flex flex-col gap-6 max-w-full pb-10">
      <header className="flex flex-col gap-2 mb-2 pt-2">
        <h1 className="text-3xl font-bold tracking-tight">Good evening, JS</h1>
        <p className="text-zinc-400 text-sm">Welcome back to your high-performance training zone.</p>
      </header>

      {/* TOP SECTION: Countdown, Readiness, Daily Target */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard delay={0}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-zinc-400 font-medium text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-400" />
              JEE Main 2027
            </span>
            <div className="px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold">
              Target
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-bold tracking-tighter text-white">142</span>
            <span className="text-zinc-400 font-medium mb-1 tracking-tight">days remaining</span>
          </div>
        </StatCard>

        <StatCard delay={0.1}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-zinc-400 font-medium text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              Readiness Score
            </span>
            <span className="text-2xl font-bold text-white tracking-tight">62%</span>
          </div>
          <div className="mt-4">
            <ProgressBar progress={62} colorClass="bg-blue-500" shadowClass="shadow-[0_0_15px_rgba(59,130,246,0.4)]" delay={0.3} />
          </div>
          <div className="mt-2 flex justify-between text-xs text-zinc-500">
            <span>Poor</span>
            <span>Avg</span>
            <span className="text-zinc-300">Ready</span>
            <span>Elite</span>
          </div>
        </StatCard>

        <StatCard delay={0.2}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-zinc-400 font-medium text-sm flex items-center gap-2">
              <Target className="w-4 h-4 text-green-400" />
              Daily Study Target
            </span>
            <span className="text-xl font-bold text-white tracking-tight">4/6 hrs</span>
          </div>
          <div className="mt-4">
            <ProgressBar progress={66} colorClass="bg-green-500" shadowClass="shadow-[0_0_15px_rgba(34,197,94,0.4)]" delay={0.4} />
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-green-400 font-medium bg-green-400/10 w-fit px-2 py-1 rounded inline-flex">
            <Flame className="w-3 h-3" />
            <span>On track to hit your goal!</span>
          </div>
        </StatCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CENTER SECTION: Today's Mission */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-end">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-400" />
              Today's Mission
            </h2>
            <span className="text-xs text-zinc-400 font-mono">2 OF 3 COMPLETED</span>
          </div>
          <ProgressBar progress={66} colorClass="bg-orange-500" shadowClass="shadow-[0_0_15px_rgba(249,115,22,0.4)]" />

          <div className="grid grid-cols-1 gap-3 mt-4">
            {/* Mission 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-orange-500/30 transition-colors group relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                <Target className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-red-400 font-mono mb-0.5">WEAKEST TOPIC</div>
                <h3 className="font-semibold text-white truncate">Rotational Dynamics: Rolling</h3>
                <p className="text-sm text-zinc-400">5 high-yield questions to patch your gap.</p>
              </div>
              <button className="whitespace-nowrap px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors flex items-center gap-2 mt-2 sm:mt-0 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                Start Now <Play className="w-4 h-4 fill-black" />
              </button>
            </motion.div>

            {/* Mission 2 */}
            <motion.div 
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
              className="bg-zinc-950/40 border border-zinc-800/60 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 relative overflow-hidden opacity-60"
            >
              <div className="absolute inset-0 bg-green-500/5 mix-blend-overlay pointer-events-none" />
              <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center shrink-0">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-green-400 font-mono mb-0.5">DONE • MISTAKE REVISION</div>
                <h3 className="font-semibold text-zinc-300 line-through decoration-zinc-500">Atomic Structure Revisit</h3>
                <p className="text-sm text-zinc-500">3 previously incorrect questions.</p>
              </div>
            </motion.div>

            {/* Mission 3 */}
            <motion.div 
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
              className="bg-zinc-950/40 border border-zinc-800/60 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 relative overflow-hidden opacity-60"
            >
               <div className="absolute inset-0 bg-green-500/5 mix-blend-overlay pointer-events-none" />
              <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center shrink-0">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-green-400 font-mono mb-0.5">DONE • CONCEPT BOOSTER</div>
                <h3 className="font-semibold text-zinc-300 line-through decoration-zinc-500">Chemical Bonding Exceptions</h3>
                <p className="text-sm text-zinc-500">1 AI interactive explanation completed.</p>
              </div>
            </motion.div>

          </div>
        </div>

        {/* RIGHT COLUMN: Ranks and Progress */}
        <div className="space-y-6 flex flex-col">
          
          {/* RANK SECTION */}
          <StatCard delay={0.3} className="bg-gradient-to-b from-indigo-950/40 to-zinc-950 border-indigo-500/20 shadow-[inset_0_1px_rgba(99,102,241,0.2)]">
            <h3 className="text-zinc-400 font-medium text-sm mb-4">Elite Standing</h3>
            <div className="flex flex-col gap-2 text-center md:text-left">
              <span className="text-xs uppercase tracking-wider text-indigo-400 font-bold">Predicted Percentile</span>
              <div className="flex items-baseline gap-2 justify-center md:justify-start">
                <span className="text-5xl font-bold tracking-tighter text-white">98.4</span>
                <span className="text-xl text-zinc-500 font-light">%ile</span>
              </div>
              
              <div className="mt-2 flex items-center gap-2 justify-center md:justify-start bg-emerald-500/10 border border-emerald-500/20 rounded py-1.5 px-3 w-fit mx-auto md:mx-0">
                <motion.div 
                  initial={{ y: 5, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  transition={{ delay: 0.8, type: "spring" }}
                  className="flex items-center gap-1 text-emerald-400 font-bold text-sm"
                >
                  <TrendingUp className="w-4 h-4" />
                  +0.2 percentile
                </motion.div>
              </div>
              <p className="text-zinc-400 text-sm mt-3">
                You beat <span className="text-white font-semibold">1,240</span> students today. Good work.
              </p>
            </div>
          </StatCard>

          {/* QUICK ACTIONS */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "3-Min Fix", icon: Zap, color: "text-yellow-400", bg: "bg-yellow-500/10" },
              { label: "Take Test", icon: FileText, color: "text-blue-400", bg: "bg-blue-500/10" },
              { label: "Practice", icon: Target, color: "text-orange-400", bg: "bg-orange-500/10" },
              { label: "Ask Tutor", icon: MessageSquare, color: "text-indigo-400", bg: "bg-indigo-500/10" },
            ].map((action, i) => (
              <motion.button 
                key={action.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-xl p-3 flex flex-col items-center justify-center gap-2 transition-all hover:bg-zinc-800"
              >
                <div className={clsx("w-8 h-8 rounded-full flex items-center justify-center", action.bg, action.color)}>
                  <action.icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-zinc-300">{action.label}</span>
              </motion.button>
            ))}
          </div>

        </div>
      </div>

      {/* SYLLABUS PROGRESS */}
      <StatCard delay={0.6}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            Syllabus Completion
          </h2>
          <span className="text-sm text-zinc-400">Total: 48%</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { subject: "Physics", progress: 54, color: "bg-purple-500", shadow: "shadow-[0_0_15px_rgba(168,85,247,0.4)]" },
            { subject: "Chemistry", progress: 32, color: "bg-emerald-500", shadow: "shadow-[0_0_15px_rgba(16,185,129,0.4)]" },
            { subject: "Mathematics", progress: 61, color: "bg-blue-500", shadow: "shadow-[0_0_15px_rgba(59,130,246,0.4)]" }
          ].map((item, i) => (
            <div key={item.subject} className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-zinc-300">{item.subject}</span>
                <span className="text-zinc-500">{item.progress}%</span>
              </div>
              <ProgressBar progress={item.progress} colorClass={item.color} shadowClass={item.shadow} delay={0.7 + (i * 0.1)} />
            </div>
          ))}
        </div>
      </StatCard>

    </div>
  );
}
