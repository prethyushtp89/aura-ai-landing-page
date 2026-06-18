"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Target, 
  FileText, 
  Activity, 
  Map as MapIcon, 
  Bot,
  LogOut,
  Flame
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: "Home", href: "/dashboard", icon: LayoutDashboard },
  { name: "Practice", href: "/dashboard/practice", icon: Target },
  { name: "Tests", href: "/dashboard/tests", icon: FileText },
  { name: "Mistake DNA", href: "/dashboard/mistakes", icon: Activity },
  { name: "Roadmap", href: "/dashboard/plan", icon: MapIcon },
  { name: "AI Tutor", href: "/dashboard/tutor", icon: Bot },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <div className="flex w-64 flex-col bg-zinc-950 border-r border-zinc-800/50 text-zinc-100 h-screen sticky top-0">
      {/* Brand & Streak Logo */}
      <div className="p-6 flex items-center justify-between border-b border-zinc-800/50">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.3)]">
            <span className="font-bold text-white text-lg leading-none tracking-tighter">A</span>
          </div>
          <span className="font-semibold text-lg tracking-tight">AuraJEE</span>
        </Link>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400">
          <Flame className="w-3.5 h-3.5" />
          <span className="text-xs font-bold font-mono">14</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 px-2">
          Menu
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                isActive 
                  ? "bg-zinc-800/50 text-white shadow-[inset_0_1px_rgba(255,255,255,0.05)]" 
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/30"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-orange-500 rounded-r-full shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
              )}
              <Icon className={cn(
                "w-5 h-5 transition-colors",
                isActive ? "text-orange-400" : "text-zinc-500 group-hover:text-zinc-300"
              )} />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* User Profile Hook */}
      <div className="p-4 border-t border-zinc-800/50">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-zinc-800/30 transition-colors cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0 overflow-hidden">
            <span className="text-sm font-bold text-zinc-300">JS</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-zinc-200 truncate">JEE Student</div>
            <div className="text-xs text-orange-400 font-medium font-mono">Level 12</div>
          </div>
          <LogOut className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
        </div>
      </div>
    </div>
  );
}
