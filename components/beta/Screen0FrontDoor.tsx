"use client";

import { Sparkles, ArrowRight, LogIn } from "lucide-react";

interface Screen0FrontDoorProps {
  onCreateAccount: () => void;
  onSignIn: () => void;
}

export default function Screen0FrontDoor({ onCreateAccount, onSignIn }: Screen0FrontDoorProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 mb-4 animate-pulse">
          <Sparkles className="w-6 h-6" />
        </div>
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Aura Beta</h2>
        <p className="text-base text-slate-500 mt-3 font-medium">
          Unlock Your Socratic JEE Mastery
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-4">
        <button
          onClick={onCreateAccount}
          className="w-full py-4 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2 group"
        >
          Create Account
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        <button
          onClick={onSignIn}
          className="w-full py-4 px-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border border-slate-200 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <LogIn className="w-4 h-4" />
          Sign In to Portal
        </button>
      </div>

      <p className="text-center text-xs text-slate-400 mt-8">
        Designed for high-performance JEE candidates.
      </p>
    </div>
  );
}
