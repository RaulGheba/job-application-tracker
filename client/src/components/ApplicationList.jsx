function ApplicationList({ applications, onDelete, onStatusChange }) {
  const getStatusClasses = (status) => {
    switch (status) {
      case "applied":
        return "bg-blue-500/15 text-blue-300 ring-1 ring-blue-400/30";
      case "interview":
        return "bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/30";
      case "rejected":
        return "bg-rose-500/15 text-rose-300 ring-1 ring-rose-400/30";
      case "offer":
        return "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30";
      default:
        return "bg-slate-500/15 text-slate-300 ring-1 ring-slate-400/30";
    }
  };

  if (applications.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/20 px-6 py-14 text-center">
        <h3 className="text-xl font-semibold text-white">
          No applications found
        </h3>
        <p className="mt-2 text-sm text-slate-300">
          Add your first application to start tracking your job search.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {applications.map((application) => (
        <div
          key={application._id}
          className="rounded-2xl border border-white/10 bg-slate-950/30 p-5 shadow-lg transition hover:border-white/20 hover:bg-slate-900/40"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-semibold text-white">
                  {application.company}
                </h3>

                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusClasses(
                    application.status
                  )}`}
                >
                  {application.status}
                </span>
              </div>

              <p className="mt-2 text-sm text-slate-300">
                <span className="font-medium text-slate-200">Role:</span>{" "}
                {application.role || "Not specified"}
              </p>

              <div className="mt-4 space-y-3">
                <div>
                  <p className="mb-1 text-sm font-medium text-slate-200">
                    Notes
                  </p>
                  <p className="rounded-xl bg-white/5 px-4 py-3 text-sm text-slate-300">
                    {application.notes?.trim()
                      ? application.notes
                      : "No notes added yet."}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-sm font-medium text-slate-200">
                    Job Link
                  </p>
                  {application.link?.trim() ? (
                    <a
                      href={application.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex break-all text-sm font-medium text-blue-300 transition hover:text-blue-200 hover:underline"
                    >
                      {application.link}
                    </a>
                  ) : (
                    <p className="text-sm text-slate-400">No link added.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 lg:w-56">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-200">
                  Update status
                </label>
                <select
                  value={application.status}
                  onChange={(e) =>
                    onStatusChange(application._id, e.target.value)
                  }
                  className="w-full cursor-pointer rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
                >
                  <option value="applied">Applied</option>
                  <option value="interview">Interview</option>
                  <option value="rejected">Rejected</option>
                  <option value="offer">Offer</option>
                </select>
              </div>

              <button
                onClick={() => onDelete(application._id)}
                className="cursor-pointer rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-sm font-semibold text-rose-300 transition hover:bg-rose-500/20 active:scale-[0.98]"  
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ApplicationList;
