import { useState } from "react";

function ApplicationList({ applications, onDelete, onStatusChange, onNotesUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editingNotes, setEditingNotes] = useState("");

  const getStatusClasses = (status) => {
    switch (status) {
      case "applied":   return "bg-blue-500/15 text-blue-300 ring-1 ring-blue-400/30";
      case "interview": return "bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/30";
      case "rejected":  return "bg-rose-500/15 text-rose-300 ring-1 ring-rose-400/30";
      case "offer":     return "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30";
      default:          return "bg-slate-500/15 text-slate-300 ring-1 ring-slate-400/30";
    }
  };

  if (applications.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/20 px-6 py-14 text-center">
        <h3 className="text-xl font-semibold text-white">No applications found</h3>
        <p className="mt-2 text-sm text-slate-400">Add your first application to start tracking your job search.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {applications.map((application) => (
        <div
          key={application._id}
          className="rounded-2xl border border-white/10 bg-slate-950/30 shadow-lg transition hover:border-white/20 hover:bg-slate-900/40"
        >
          {/* Card header */}
          <div className="flex items-start justify-between border-b border-white/5 px-5 py-4">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-white">{application.company}</h3>
                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${getStatusClasses(application.status)}`}>
                  {application.status}
                </span>
              </div>
              <p className="mt-1 text-base font-medium text-blue-300/70">{application.role || "No role specified"}</p>
            </div>
            <p className="text-xs text-slate-500 whitespace-nowrap">
              {new Date(application.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
            </p>
          </div>

          {/* Card body */}
          <div className="grid gap-4 px-5 py-4 sm:grid-cols-2">
            {/* Notes */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Notes</p>
                {editingId !== application._id && (
                  <button
                    onClick={() => { setEditingId(application._id); setEditingNotes(application.notes || ""); }}
                    className="text-xs text-blue-400 hover:text-blue-300 transition cursor-pointer"
                  >
                    Edit
                  </button>
                )}
              </div>
              {editingId === application._id ? (
                <div className="space-y-2">
                  <textarea
                    value={editingNotes}
                    onChange={(e) => setEditingNotes(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 resize-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => { onNotesUpdate(application._id, editingNotes); setEditingId(null); }}
                      className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 transition cursor-pointer"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-white transition cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="rounded-xl bg-white/5 px-3 py-2.5 text-sm text-slate-300 min-h-10">
                  {application.notes?.trim() ? application.notes : <span className="text-slate-500 italic">No notes added yet.</span>}
                </p>
              )}
            </div>

            {/* Right column: job link + status */}
            <div className="flex flex-col gap-4">
              <div>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Job Link</p>
                {application.link?.trim() ? (
                  <a
                    href={application.link.startsWith("http") ? application.link : `https://${application.link}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex break-all text-sm font-medium text-blue-400 transition hover:text-blue-300 hover:underline"
                  >
                    {application.link}
                  </a>
                ) : (
                  <p className="text-sm text-slate-500 italic">No link added.</p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap">Status</p>
                <select
                  value={application.status}
                  onChange={(e) => onStatusChange(application._id, e.target.value)}
                  className="w-full cursor-pointer rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
                >
                  <option value="applied">Applied</option>
                  <option value="interview">Interview</option>
                  <option value="rejected">Rejected</option>
                  <option value="offer">Offer</option>
                </select>
              </div>
            </div>
          </div>

          {/* Card footer */}
          <div className="flex justify-end border-t border-white/5 px-5 py-3">
            <button
              onClick={() => onDelete(application._id)}
              className="cursor-pointer text-sm font-semibold text-rose-500 transition hover:text-rose-400"
            >
              Delete application
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ApplicationList;
