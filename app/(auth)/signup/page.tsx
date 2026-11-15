
"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import AuthLayout from "@/components/auth/auth-layout";
import GoogleAuthButton from "@/components/auth/google-auth-button";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleGoogleSignup() {
    setMessage("Google authentication will be connected to the backend.");
  }

  function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setMessage("Your passwords do not match.");
      return;
    }

    setMessage("Signup form is ready. Backend integration is the next step.");
  }

  return (
    <AuthLayout
      title="Create your account"
      description="Join ElectionWatch to stay informed and support a more transparent electoral process."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold text-blue-700 hover:text-blue-800"
          >
            Sign in
          </Link>
        </>
      }
    >
      <GoogleAuthButton onClick={handleGoogleSignup} />

      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-medium uppercase text-slate-400">
          Or sign up with email
        </span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <form onSubmit={handleSignup} className="space-y-5">
        <div>
          <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-slate-700">
            Full name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              autoComplete="name"
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-slate-300 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

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
          <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="Create a password"
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
          <p className="mt-2 text-xs text-slate-400">
            Use at least 8 characters.
          </p>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-slate-700">
            Confirm password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="Confirm your password"
              className="w-full rounded-lg border border-slate-300 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <label className="flex items-start gap-3 text-sm text-slate-600">
          <input
            type="checkbox"
            required
            className="mt-1 h-4 w-4 rounded border-slate-300 accent-blue-700"
          />
          <span>
            I agree to the{" "}
            <Link href="/terms" className="font-medium text-blue-700 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="font-medium text-blue-700 hover:underline">
              Privacy Policy
            </Link>.
          </span>
        </label>

        {message && (
          <p role="status" className="rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-800">
            {message}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create account
        </button>
      </form>
    </AuthLayout>
  );
}
