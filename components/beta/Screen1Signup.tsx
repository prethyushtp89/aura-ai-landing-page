"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Loader2, ArrowRight, ShieldCheck } from "lucide-react";

interface Screen1SignupProps {
  targetYear: string;
  onSuccess: (userId: string, data: { firstName: string; email: string }) => void;
}

export default function Screen1Signup({ targetYear, onSuccess }: Screen1SignupProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Supabase Auth Sign Up
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      console.log("Exact Supabase Auth Sign Up response data object:", authData);
      console.log("Supabase Auth Sign Up response details:", {
        user: authData.user ? `Present (ID: ${authData.user.id})` : "Null",
        session: authData.session ? `Present (Token: ${authData.session.access_token.slice(0, 15)}...)` : "Null (Email confirmation required or auto-login disabled)"
      });

      const user = authData.user;
      if (!user) {
        throw new Error("Signup failed. Please try again.");
      }

      console.log("Supabase Auth Sign Up Success. User ID:", user.id);

      // 2. Create row in users_profile table
      const { error: profileError } = await supabase
        .from("users_profile")
        .insert([
          {
            id: user.id,
            first_name: firstName,
            email: email,
            target_year: parseInt(targetYear),
            created_at: new Date().toISOString(),
          },
        ]);

      if (profileError) {
        throw profileError;
      }

      console.log("users_profile Table Insertion Success for User ID:", user.id);

      // Proceed to the next step
      onSuccess(user.id, { firstName, email });
    } catch (err: any) {
      const errorMessage = err.message || "An unexpected error occurred.";
      setError(errorMessage);
      alert(`Signup/Profile Creation Failed:\n${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 mb-4">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create your account</h2>
        <p className="text-sm text-slate-500 mt-2">
          Start your high-performance JEE prep journey with Aura
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              First Name
            </label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="e.g., Rohan"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-900 placeholder-slate-400 bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="rohan@example.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-900 placeholder-slate-400 bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-900 placeholder-slate-400 bg-slate-50/50"
            />
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
                Setting up Aura...
              </>
            ) : (
              <>
                Continue to Profile Setup
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      <p className="text-center text-xs text-slate-400 mt-6">
        By signing up, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}
