"use client";

import { SidebarNav } from "@/components/app-ui/SidebarNav";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex overflow-hidden lg:overflow-visible">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block relative z-20">
        <SidebarNav />
      </div>

      {/* Mobile Header & Overlay Navigation */}
      <div className="lg:hidden fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="flex items-center justify-between p-4 flex-1">
          <div className="flex flex-col">
           <span className="font-semibold text-lg tracking-tight">AuraJEE</span>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div 
        className={clsx(
          "fixed inset-0 z-40 lg:hidden transition-opacity duration-300",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
        <div 
          className={clsx(
            "absolute top-0 left-0 bottom-0 w-64 transform transition-transform duration-300 ease-in-out",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div onClick={() => setMobileMenuOpen(false)}>
            <SidebarNav />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto w-full relative z-10 pt-16 lg:pt-0 pb-20 lg:pb-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="relative z-10 flex-1 flex flex-col min-h-0 container max-w-6xl mx-auto p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
