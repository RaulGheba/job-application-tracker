const stack = [
  { name: "React", description: "Frontend UI library" },
  { name: "React Router", description: "Client-side routing" },
  { name: "Tailwind CSS", description: "Utility-first styling" },
  { name: "Node.js + Express", description: "Backend API server" },
  { name: "MongoDB + Mongoose", description: "Database and data modeling" },
  { name: "Axios", description: "HTTP requests from the client" },
];

function AboutPage() {
  return (
    <main className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <section className="mb-12">
          <p className="mb-3 text-sm font-medium text-blue-400">CS Graduate · Web & Mobile Developer</p>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl">Hey, I'm Raul.</h1>
          <p className="text-lg leading-relaxed text-slate-400">
            I'm a Computer Science graduate with experience building web and mobile apps.
            Job Tracker started as a tool for my own job search — I was tired of losing track
            of applications in a spreadsheet and wanted something that actually felt good to use.
          </p>
        </section>

        {/* The mission */}
        <section className="mb-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
          <h2 className="mb-4 text-xl font-semibold text-white">The goal</h2>
          <p className="leading-relaxed text-slate-400">
            Job searching is already stressful enough. Losing track of where you applied,
            forgetting to follow up, or not knowing how many interviews you've had this month
            shouldn't add to that stress. Job Tracker is my attempt at making that experience
            simpler — for myself first, and hopefully for anyone else who finds it useful.
          </p>
        </section>

        {/* What's next */}
        <section className="mb-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
          <h2 className="mb-4 text-xl font-semibold text-white">What's next</h2>
          <p className="leading-relaxed text-slate-400">
            This is a living project. Coming up: user accounts so your data stays yours,
            better analytics to spot patterns in your search, and a mobile-friendly experience
            so you can log applications on the go. Built with the same care I'd put into any
            production app.
          </p>
        </section>

        {/* Tech stack */}
        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
          <h2 className="mb-6 text-xl font-semibold text-white">Tech stack</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {stack.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <div className="h-2 w-2 shrink-0 rounded-full bg-blue-400" />
                <div>
                  <p className="text-sm font-semibold text-white">{item.name}</p>
                  <p className="text-xs text-slate-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}

export default AboutPage;
