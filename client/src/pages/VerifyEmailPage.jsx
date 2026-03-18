import { useEffect, useRef, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying"); // verifying | success | error
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const token = searchParams.get("token");
    if (!token) return setStatus("error");

    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/auth/verify/${token}`)
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  }, [searchParams]);

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        {status === "verifying" && (
          <>
            <div className="mb-4 text-5xl">⏳</div>
            <h1 className="text-2xl font-bold text-white">Verifying your email...</h1>
          </>
        )}
        {status === "success" && (
          <>
            <div className="mb-4 text-5xl">✅</div>
            <h1 className="mb-2 text-2xl font-bold text-white">You're verified!</h1>
            <p className="mb-8 text-slate-400">Your account is active. Sign in to get started.</p>
            <Link
              to="/login"
              className="inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Sign in
            </Link>
          </>
        )}
        {status === "error" && (
          <>
            <div className="mb-4 text-5xl">❌</div>
            <h1 className="mb-2 text-2xl font-bold text-white">Invalid link</h1>
            <p className="mb-8 text-slate-400">This verification link is invalid or has already been used.</p>
            <Link to="/" className="text-blue-400 hover:text-blue-300 text-sm">
              Back to home
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
