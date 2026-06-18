"use client";

import { useState, useEffect } from "react";
import Screen0FrontDoor from "@/components/beta/Screen0FrontDoor";
import Screen1Signup from "@/components/beta/Screen1Signup";
import Screen2Context from "@/components/beta/Screen2Context";
import Screen3Benchmark from "@/components/beta/Screen3Benchmark";
import Screen4Dashboard from "@/components/beta/Screen4Dashboard";
import Screen5SignIn from "@/components/beta/Screen5SignIn";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function BetaOnboardingPage() {
  const [step, setStep] = useState(0); // Initialize at Front Door
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    firstName: "",
    email: "",
    password: "",
    targetYear: "2027",
    class: "",
    confidence: 70,
  });

  const [keysConfigured, setKeysConfigured] = useState(true);

  // Check if env variables for Supabase are configured
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key || url === "YOUR_SUPABASE_URL" || key === "YOUR_SUPABASE_ANON_KEY") {
      setKeysConfigured(false);
    }
  }, []);

  const handleCreateAccountClick = () => {
    console.log("Step transition: 0 -> 1 (Create Account)");
    setStep(1);
  };

  const handleSignInClick = () => {
    console.log("Step transition: 0 -> 5 (Sign In Form)");
    setStep(5);
  };

  const handleSignupSuccess = (uid: string, data: { firstName: string; email: string }) => {
    setUserId(uid);
    setUserData((prev) => ({
      ...prev,
      firstName: data.firstName,
      email: data.email,
    }));
    console.log("Step transition: 1 -> 2. Registered User ID:", uid, data);
    setStep(2);
  };

  const handleSignInSuccess = (uid: string, profile: { firstName: string; email: string; targetYear: string; class: string; confidence: number }) => {
    setUserId(uid);
    setUserData({
      firstName: profile.firstName,
      email: profile.email,
      password: "",
      targetYear: profile.targetYear,
      class: profile.class,
      confidence: profile.confidence,
    });
    console.log("Step transition: 5 -> 4. Profile retrieved successfully for User ID:", uid, profile);
    setStep(4);
  };

  const handleProfileMissing = (uid: string, email: string) => {
    setUserId(uid);
    setUserData((prev) => ({
      ...prev,
      email: email,
    }));
    console.log("Step transition: 5 -> 2. Profile missing for User ID:", uid, "Redirecting to context selection.");
    setStep(2);
  };

  const handleContextSuccess = (data: { class: string; targetYear: string }) => {
    setUserData((prev) => ({
      ...prev,
      class: data.class,
      targetYear: data.targetYear,
    }));
    console.log("Step transition: 2 -> 3. Target Class:", data.class, "Year:", data.targetYear);
    setStep(3);
  };

  const handleBenchmarkSuccess = (confidence: number) => {
    setUserData((prev) => ({
      ...prev,
      confidence,
    }));
    console.log("Step transition: 3 -> 4. Self Confidence Score:", confidence);
    setStep(4);
  };

  const handleReset = () => {
    console.log("Onboarding flow reset. Returning to Front Door (Step 0).");
    setStep(0);
    setUserId(null);
    setUserData({
      firstName: "",
      email: "",
      password: "",
      targetYear: "2027",
      class: "",
      confidence: 70,
    });
  };

  const goBack = () => {
    if (step === 1 || step === 5) {
      console.log(`Step transition: Back from Step ${step} -> Step 0`);
      setStep(0);
    } else if (step > 1 && step < 4) {
      console.log(`Step transition: Back from Step ${step} -> Step ${step - 1}`);
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0F172A] font-sans antialiased flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
      {/* Dev warning for Supabase Keys */}
      {!keysConfigured && (
        <div className="max-w-md mx-auto mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
          <div>
            <p className="font-bold">Supabase Config Missing</p>
            <p className="mt-0.5 opacity-90">
              Please define <code className="font-mono bg-amber-100 px-1 rounded text-amber-900">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="font-mono bg-amber-100 px-1 rounded text-amber-900">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in <code className="font-mono">.env.local</code> to test live authentication.
            </p>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full">
          {/* Back button for Step 1 (Signup) or Step 5 (Signin) */}
          {(step === 1 || step === 5) && (
            <div className="max-w-md mx-auto flex items-center mb-8 px-2">
              <button
                onClick={goBack}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Welcome
              </button>
            </div>
          )}

          {/* Progress Indicators & Back Button for steps 2 & 3 */}
          {step > 1 && step < 4 && (
            <div className="max-w-xl mx-auto flex items-center justify-between mb-8 px-2">
              <button
                onClick={goBack}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${step >= 1 ? "bg-indigo-600" : "bg-slate-200"}`} />
                <span className={`w-12 h-0.5 ${step >= 2 ? "bg-indigo-600" : "bg-slate-200"}`} />
                <span className={`w-2 h-2 rounded-full ${step >= 2 ? "bg-indigo-600" : "bg-slate-200"}`} />
                <span className={`w-12 h-0.5 ${step >= 3 ? "bg-indigo-600" : "bg-slate-200"}`} />
                <span className={`w-2 h-2 rounded-full ${step >= 3 ? "bg-indigo-600" : "bg-slate-200"}`} />
              </div>
              <span className="text-xs font-mono font-bold text-slate-400">STEP {step} OF 3</span>
            </div>
          )}

          {/* Render Step Components */}
          {step === 0 && <Screen0FrontDoor onCreateAccount={handleCreateAccountClick} onSignIn={handleSignInClick} />}
          {step === 1 && <Screen1Signup targetYear={userData.targetYear} onSuccess={handleSignupSuccess} />}
          {step === 2 && <Screen2Context userId={userId} onSuccess={handleContextSuccess} />}
          {step === 3 && <Screen3Benchmark userId={userId} onSuccess={handleBenchmarkSuccess} />}
          {step === 4 && <Screen4Dashboard userData={userData} onReset={handleReset} />}
          {step === 5 && <Screen5SignIn onSuccess={handleSignInSuccess} onProfileMissing={handleProfileMissing} />}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400 mt-12">
        Aura Beta Onboarding Core Engine • Powered by Next.js & Supabase
      </footer>
    </div>
  );
}
