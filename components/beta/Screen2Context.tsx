"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Loader2, GraduationCap, Calendar, ArrowRight } from "lucide-react";

interface Screen2ContextProps {
  userId: string | null;
  onSuccess: (data: { class: string; targetYear: string }) => void;
}

const CLASS_OPTIONS = [
  { id: "11", label: "Class 11", desc: "Starting early for JEE 2028" },
  { id: "12", label: "Class 12", desc: "Targeting JEE 2027" },
  { id: "Dropper", label: "Dropper / Repeater", desc: "Full focus on JEE 2027" },
  { id: "Skip", label: "Skip / Other", desc: "Just exploring Aura" },
];

const YEAR_OPTIONS = ["2027", "2028", "2029"];

export default function Screen2Context({ userId, onSuccess }: Screen2ContextProps) {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedYear, setSelectedYear] = useState("2027");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClass) {
      setError("Please select your class to proceed.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (userId) {
        // Update user profile in Supabase
        const { error: updateError } = await supabase
          .from("users_profile")
          .update({
            class: selectedClass,
            target_year: selectedClass === "Skip" ? null : parseInt(selectedYear),
          })
          .eq("id", userId);

        if (updateError) throw updateError;

        console.log("users_profile context updated successfully for User ID:", userId);
      }

      onSuccess({ class: selectedClass, targetYear: selectedYear });
    } catch (err: any) {
      const errorMessage = err.message || "Could not save profile details. Please try again.";
      setError(errorMessage);
      alert(`Profile Update Failed:\n${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 mb-4">
          <GraduationCap className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Tell us about your target</h2>
        <p className="text-sm text-slate-500 mt-2">
          We customize your syllabus depth and benchmark algorithms based on your class
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">
              Select Your Academic Status
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CLASS_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setSelectedClass(opt.id);
                    if (opt.id === "11") setSelectedYear("2028");
                    else if (opt.id === "12" || opt.id === "Dropper") setSelectedYear("2027");
                  }}
                  className={`p-4 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between h-24 ${
                    selectedClass === opt.id
                      ? "border-indigo-600 bg-indigo-50/20 ring-1 ring-indigo-600"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                  }`}
                >
                  <span className={`font-semibold text-sm ${selectedClass === opt.id ? "text-indigo-900" : "text-slate-900"}`}>
                    {opt.label}
                  </span>
                  <span className="text-xs text-slate-400">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {selectedClass !== "Skip" && selectedClass !== "" && (
            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Target JEE Year
              </label>
              <div className="flex gap-2">
                {YEAR_OPTIONS.map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => setSelectedYear(year)}
                    className={`px-5 py-2.5 rounded-lg border text-sm font-semibold transition-all duration-150 ${
                      selectedYear === year
                        ? "border-indigo-600 bg-indigo-50/30 text-indigo-900"
                        : "border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-100 text-sm text-rose-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !selectedClass}
            className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Updating target profiles...
              </>
            ) : (
              <>
                Next Step
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
