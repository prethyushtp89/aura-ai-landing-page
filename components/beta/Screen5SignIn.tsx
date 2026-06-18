"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Loader2, LogIn, Mail, Lock } from "lucide-react";

interface ProfileData {
  firstName: string;
  email: string;
  targetYear: string;
  class: string;
  confidence: number;
}

interface Screen5SignInProps {
  onSuccess: (userId: string, profile: ProfileData) => void;
  onProfileMissing: (userId: string, email: string) => void;
}

export default function Screen5SignIn({ onSuccess, onProfileMissing }: Screen5SignInProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log("Attempting sign in with password for email:", email);
      // 1. Supabase Sign In with Password
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        console.error("Exact Supabase Auth Sign In error response:", authError);
        throw authError;
      }

      const user = authData.user;
      if (!user) {
        throw new Error("Login succeeded but user session is invalid.");
      }

      console.log("Supabase Auth User Login Success. User ID:", user.id);
      console.log("Session details:", authData.session ? "Active" : "None");

      // 2. Check and fetch users_profile
      const { data: profileData, error: profileError } = await supabase
        .from("users_profile")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.warn("Could not retrieve profile record:", profileError.message);
        console.log("Routing user to profile configuration step.");
        // Profile does not exist, trigger profile missing route
        onProfileMissing(user.id, email);
        return;
      }

      if (!profileData) {
        console.warn("Empty profile record returned.");
        onProfileMissing(user.id, email);
        return;
      }

      console.log("users_profile Retrieval Success for User ID:", user.id);

      // Profile found, construct data payload
      const profilePayload: ProfileData = {
        firstName: profileData.first_name || "",
        email: profileData.email || email,
        targetYear: profileData.target_year ? String(profileData.target_year) : "2027",
        class: profileData.class || "",
        confidence: profileData.confidence || 70,
      };

      onSuccess(user.id, profilePayload);
    } catch (err: any) {
      console.error("Supabase Auth Sign In error caught:", err);
      
      let errorMessage = err.message || "An unexpected error occurred during sign in.";
      const isEmailNotConfirmed = err.code === "email_not_confirmed" || errorMessage.toLowerCase().includes("email not confirmed");

      if (isEmailNotConfirmed) {
        errorMessage = "Please verify your email before signing in.";
      }

      setError(errorMessage);
      alert(`Sign In Failed:\n${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 mb-4">
          <LogIn className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Sign in to your portal</h2>
        <p className="text-sm text-slate-500 mt-2">
          Resume your Socratic JEE preparation with Aura
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <form onSubmit={handleSignIn} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
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
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              Password
            </label>
            <input
              type="password"
              required
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
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <LogIn className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
