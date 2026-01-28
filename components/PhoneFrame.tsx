"use client";

import { motion } from "framer-motion";

export function PhoneFrame({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-[320px] h-[640px] z-20"
        >
            {/* OUTER CHASSIS (Titanium Finish) */}
            <div className="absolute inset-0 rounded-[3rem] border-4 border-slate-300 bg-slate-100 shadow-2xl overflow-hidden z-10 box-border">
                {/* INNER FRAME (Black Bezel) */}
                <div className="absolute inset-1 rounded-[2.5rem] bg-black border border-slate-900/50 overflow-hidden box-border">

                    {/* DYNAMIC ISLAND */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-black rounded-full z-50 flex items-center justify-center">
                        <div className="w-[60%] h-[60%] flex justify-between items-center px-2">
                            {/* Mic/Cam indicators - faint */}
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-900/80" />
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-900/80" />
                        </div>
                    </div>

                    {/* STATUS BAR MOCKUP */}
                    <div className="absolute top-1.5 left-8 text-[10px] font-semibold text-white z-40">9:41</div>
                    <div className="absolute top-2 right-8 flex gap-1 z-40">
                        <div className="w-3 h-2 bg-white rounded-[2px]" />
                        <div className="w-2.5 h-2 bg-white rounded-[2px]" />
                    </div>

                    {/* SCREEN CONTENT AREA */}
                    {/* We'll use a soft gradient background for the 'App' background */}
                    <div className="w-full h-full bg-slate-50 relative pt-12">
                        {/* Background Wallpaper/Texture */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50/50" />

                        {/* Centered Widget Container */}
                        <div className="relative w-full h-full flex items-center justify-center p-4">
                            {/* Injected Content (The RankReadinessCard) */}
                            <div className="scale-[0.95] origin-center shadow-2xl rounded-3xl">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* BUTTONS (Side Keys) */}
            {/* Mute Switch */}
            <div className="absolute top-24 -left-[6px] h-6 w-1.5 bg-slate-300 rounded-l-md shadow-sm z-0" />
            {/* Volume Up */}
            <div className="absolute top-36 -left-[6px] h-10 w-1.5 bg-slate-300 rounded-l-md shadow-sm z-0" />
            {/* Volume Down */}
            <div className="absolute top-52 -left-[6px] h-10 w-1.5 bg-slate-300 rounded-l-md shadow-sm z-0" />
            {/* Power Button */}
            <div className="absolute top-40 -right-[6px] h-16 w-1.5 bg-slate-300 rounded-r-md shadow-sm z-0" />

            {/* REFLECTIONS / GLASS GLARE (Overlay on top of chassis) */}
            <div className="absolute inset-0 rounded-[3rem] pointer-events-none z-30 shadow-[inset_0_0_20px_rgba(255,255,255,0.4)] border border-white/20" />

        </motion.div>
    );
}
