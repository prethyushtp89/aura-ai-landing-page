"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Loader2, Compass, ArrowRight, Zap, Target } from "lucide-react";

interface Screen3BenchmarkProps {
  userId: string | null;
  onSuccess: (confidence: number) => void;
}

const getConfidenceFeedback = (val: number) => {
  if (val < 65) {
    return {
      title: "Foundation Focus",
      desc: "We will prioritize conceptual clarity, visual derivations, and basic mock-drill sessions.",
      color: "text-amber-600 bg-amber-50 border-amber-100",
    };
  }
  if (val < 85) {
    return {
      title: "Tactical Execution",
      desc: "Focusing on mistake DNA patterns, time management strategies, and weak-topic boosting.",
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    };
  }
  return {
    title: "Elite Polish",
    desc: "Optimizing for top ranks with hard numericals, shortcut methods, and high-pressure tests.",
    color: "text-emerald-600 bg-emerald-50 border-emerald-100",
  };
};

export default function Screen3Benchmark({ userId, onSuccess }: Screen3BenchmarkProps) {
  const [confidence, setConfidence] = useState(70);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (userId) {
        // Update user profile in Supabase
        const { error: updateError } = await supabase
          .from("users_profile")
          .update({
            confidence: confidence,
          })
          .eq("id", userId);

        if (updateError) throw updateError;

        console.log("users_profile confidence updated successfully for User ID:", userId);
      }

      onSuccess(confidence);
    } catch (err: any) {
      const errorMessage = err.message || "Failed to save your settings. Please try again.";
      setError(errorMessage);
      alert(`Profile Setup Failed:\n${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const feedback = getConfidenceFeedback(confidence);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 mb-4">
          <Compass className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Evaluate your current stance</h2>
        <p className="text-sm text-slate-500 mt-2">
          Rate your self-confidence for the upcoming JEE exam
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                JEE Readiness Confidence
              </span>
              <span className="text-3xl font-mono font-bold text-indigo-600">{confidence}%</span>
            </div>

            <div className="relative mb-4">
              <input
                type="range"
                min="50"
                max="100"
                value={confidence}
                onChange={(e) => setConfidence(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 outline-none"
              />
              <div className="flex justify-between text-xs font-semibold text-slate-400 mt-2 px-1">
                <span>50% (Baseline)</span>
                <span>75% (Proficient)</span>
                <span>100% (Air 1 Aspirant)</span>
              </div>
            </div>
          </div>

          {/* Dynamic AI Feedback Card */}
          <div className={`p-5 rounded-xl border transition-all duration-300 ${feedback.color}`}>
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {confidence < 65 ? (
                  <Target className="w-5 h-5 shrink-0" />
                ) : (
                  <Zap className="w-5 h-5 shrink-0" />
                )}
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider">{feedback.title}</h4>
                <p className="text-xs mt-1.5 opacity-90 leading-relaxed">{feedback.desc}</p>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-100 text-sm text-rose-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Initializing your Dashboard...
              </>
            ) : (
              <>
                Complete Setup & Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
