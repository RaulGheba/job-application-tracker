import { Link } from "react-router-dom";

const features = [
  {
    icon: "📋",
    title: "Log every application",
    description:
      "Save company, role, status, notes, and job links in one place. Never lose track of where you applied.",
  },
  {
    icon: "📊",
    title: "Track your pipeline",
    description:
      "See at a glance how many applications are in progress, at interview stage, or have turned into offers.",
  },
  {
    icon: "⚡",
    title: "Update instantly",
    description:
      "Change status with a single click as your applications move through each stage of the process.",
  },
];

function HomePage() {
  return (
    <main className="min-h-screen px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Hero */}
        <section className="mb-24 text-center">
          <h1 className="mx-auto mb-4 max-w-3xl text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Track your job search.{" "}
            <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Stay in control.
            </span>
          </h1>

          <p className="mb-2 text-xs font-medium tracking-widest text-slate-500 uppercase">
            Built by a dev who's been through it
          </p>

          <p className="mx-auto mb-10 max-w-xl text-lg text-slate-400">
            I built this during my own job hunt because spreadsheets weren't
            cutting it. Now it's yours too — keep every application organized
            and focus on landing the role.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/applications"
              className="rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-500 active:scale-[0.98]"
            >
              View my applications →
            </Link>
            <Link
              to="/about"
              className="rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white active:scale-[0.98]"
            >
              Learn more
            </Link>
          </div>
        </section>

        {/* Feature cards */}
        <section className="mb-24 grid gap-6 sm:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md transition hover:border-white/20 hover:bg-white/10"
            >
              <div className="mb-4 text-3xl">{feature.icon}</div>
              <h3 className="mb-2 text-base font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </section>

        {/* CTA banner */}
        <section className="rounded-3xl border border-blue-500/20 bg-linear-to-r from-blue-600/20 to-cyan-600/10 p-10 text-center shadow-2xl backdrop-blur-xl">
          <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
            Ready to get organized?
          </h2>
          <p className="mx-auto mb-8 max-w-sm text-slate-400">
            Add your first application and start tracking. Built by someone who
            knows the grind.
          </p>
          <Link
            to="/applications"
            className="inline-block rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-500 active:scale-[0.98]"
          >
            Get started →
          </Link>
        </section>
      </div>
    </main>
  );
}

export default HomePage;
