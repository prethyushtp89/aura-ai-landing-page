"use client";

import { Lock, Unlock, Flame, Award, BookOpen, CheckCircle2, ChevronRight, LogOut, Compass } from "lucide-react";

interface Screen4DashboardProps {
  userData: {
    firstName: string;
    email: string;
    targetYear: string;
    class: string;
    confidence: number;
  };
  onReset: () => void;
}

export default function Screen4Dashboard({ userData, onReset }: Screen4DashboardProps) {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Top Navigation */}
      <header className="flex justify-between items-center bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <span className="font-bold text-white text-sm">A</span>
          </div>
          <span className="font-bold text-slate-900 tracking-tight">Aura Beta</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50/80 border border-orange-100 text-orange-600">
            <Flame className="w-4 h-4 fill-orange-500" />
            <span className="text-xs font-extrabold font-mono">1 Day Streak</span>
          </div>
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Learning Modules */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-r from-indigo-600 to-violet-700 rounded-2xl p-6 text-white shadow-md">
            <h2 className="text-2xl font-extrabold tracking-tight">
              Welcome to Aura, {userData.firstName}!
            </h2>
            <p className="text-sm text-indigo-100 mt-2 max-w-xl leading-relaxed">
              Your preparation dashboard has been calibrated to Class {userData.class} with a target year of {userData.targetYear}. Let's secure your weak spots step-by-step.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Your Core Subjects</h3>

            <div className="grid grid-cols-1 gap-4">
              {/* Chemistry - Active */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Unlock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Active Module</span>
                      <h4 className="text-lg font-bold text-slate-900">Chemistry</h4>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    Syllabus: 0% Complete
                  </span>
                </div>

                <div className="border-t border-slate-100 pt-4 mt-4 space-y-3">
                  <div className="flex items-center justify-between text-sm p-3 rounded-xl hover:bg-slate-50 transition-colors border border-dashed border-slate-200">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-slate-400" />
                      <span className="font-semibold text-slate-700">Atomic Structure: Quantum Numbers</span>
                    </div>
                    <button className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800">
                      Begin Practice <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-sm p-3 rounded-xl hover:bg-slate-50 transition-colors border border-dashed border-slate-200">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-slate-400" />
                      <span className="font-semibold text-slate-700">Chemical Bonding: Molecular Orbital Theory</span>
                    </div>
                    <button className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800">
                      Begin Practice <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Physics - Locked */}
              <div className="bg-slate-50/50 rounded-2xl border border-slate-200/60 p-6 opacity-75 relative">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Locked Module</span>
                      <h4 className="text-lg font-bold text-slate-900">Physics</h4>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-md">
                    Unlocks in 3 Days
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                  Physics module requires completing the Chemistry setup and evaluating your baseline mistake DNA.
                </p>
              </div>

              {/* Mathematics - Locked */}
              <div className="bg-slate-50/50 rounded-2xl border border-slate-200/60 p-6 opacity-75 relative">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Locked Module</span>
                      <h4 className="text-lg font-bold text-slate-900">Mathematics</h4>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-md">
                    Unlocks in 5 Days
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                  Math module will open once you achieve an accuracy of 70% in physical chemistry concepts.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Stats / Metadata summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-900">Onboarding Summary</h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Email</span>
                <span className="text-sm font-semibold text-slate-700 truncate max-w-[180px]">
                  {userData.email}
                </span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Academic Level</span>
                <span className="text-sm font-semibold text-slate-700">Class {userData.class}</span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Target JEE Year</span>
                <span className="text-sm font-semibold text-slate-700">{userData.targetYear}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Self Confidence</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-indigo-600">{userData.confidence}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">Your Action Plan</h4>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Based on your evaluation, we recommend completing the first 5 chemical kinetics lessons first.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
