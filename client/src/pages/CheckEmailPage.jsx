import { Link } from "react-router-dom";

export default function CheckEmailPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <div className="mb-6 text-5xl">📬</div>
        <h1 className="mb-2 text-3xl font-bold text-white">Check your inbox</h1>
        <p className="mb-8 text-slate-400">
          We sent a verification link to your email. Click it to activate your account, then come back to sign in.
        </p>
        <Link
          to="/login"
          className="inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Go to sign in
        </Link>
      </div>
    </main>
  );
}
