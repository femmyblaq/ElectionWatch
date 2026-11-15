
"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import AuthLayout from "@/components/auth/auth-layout";
import GoogleAuthButton from "@/components/auth/google-auth-button";

export default function SigninPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleGoogleSignin() {
    setMessage("Google authentication will be connected to the backend.");
  }

  function handleSignin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Signin form is ready. Backend integration is the next step.");
  }

  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to your ElectionWatch account to continue."
      footer={
        <>
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-blue-700 hover:text-blue-800"
          >
            Create an account
          </Link>
        </>
      }
    >
      <GoogleAuthButton onClick={handleGoogleSignin} />

      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-medium uppercase text-slate-400">
          Or sign in with email
        </span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <form onSubmit={handleSignin} className="space-y-5">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
            Email address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Enter your email address"
              className="w-full rounded-lg border border-slate-300 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-blue-700 hover:text-blue-800"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-300 py-3 pl-11 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>
        </div>

        {message && (
          <p role="status" className="rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-800">
            {message}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Sign in
        </button>
      </form>
    </AuthLayout>
  );
}
