import { useEffect, useMemo, useState } from "react";
import ApplicationForm from "../components/ApplicationForm";
import ApplicationList from "../components/ApplicationList";
import {
  getApplications,
  createApplication,
  deleteApplication,
  updateApplication,
} from "../services/applicationService";

function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getApplications();
        setApplications(data);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
        setError("Could not load applications. Is the server running?");
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const updatedApplication = await updateApplication(id, { status: newStatus });
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? updatedApplication : app))
      );
    } catch (error) {
      console.error("Failed to update status:", error);
      setError("Failed to update status. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;
    try {
      await deleteApplication(id);
      setApplications((prev) => prev.filter((app) => app._id !== id));
    } catch (error) {
      console.error("Delete failed", error);
      setError("Failed to delete application. Please try again.");
    }
  };

  const handleAddApplication = async (newApplication) => {
    try {
      const createdApplication = await createApplication(newApplication);
      setApplications((prev) => [createdApplication, ...prev]);
    } catch (error) {
      console.error("Failed to create application:", error);
      setError("Failed to add application. Please try again.");
    }
  };

  const filteredApplications =
    filterStatus === "all"
      ? applications
      : applications.filter((app) => app.status === filterStatus);

  const stats = useMemo(() => ({
    total: applications.length,
    applied: applications.filter((app) => app.status === "applied").length,
    interview: applications.filter((app) => app.status === "interview").length,
    rejected: applications.filter((app) => app.status === "rejected").length,
    offer: applications.filter((app) => app.status === "offer").length,
  }), [applications]);

  const statCards = [
    { label: "Total", value: stats.total },
    { label: "Applied", value: stats.applied },
    { label: "Interview", value: stats.interview },
    { label: "Rejected", value: stats.rejected },
    { label: "Offer", value: stats.offer },
  ];

  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <section className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Applications
              </h1>
              <p className="mt-3 text-base text-slate-400">
                Manage your job search pipeline in one place.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200 shadow-lg shadow-emerald-950/20">
              {stats.total === 0
                ? "No applications yet"
                : `${filteredApplications.length} shown / ${stats.total} total`}
            </div>
          </div>
        </section>

        {/* Error banner */}
        {error && (
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-rose-500/30 bg-rose-500/10 px-5 py-4 text-sm text-rose-300">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-4 cursor-pointer text-rose-400 hover:text-rose-200"
            >
              ✕
            </button>
          </div>
        )}

        {/* Stat cards */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {statCards.map((card) => (
            <div
              key={card.label}
              className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-xl shadow-black/10 backdrop-blur-md"
            >
              <p className="text-sm font-medium text-slate-300">{card.label}</p>
              <p className="mt-3 text-3xl font-bold text-white">{card.value}</p>
            </div>
          ))}
        </section>

        {/* Add application form */}
        <section className="mb-8 rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="mb-5">
            <h2 className="text-2xl font-semibold text-white">Add new application</h2>
            <p className="mt-1 text-sm text-slate-400">
              Save company, role, and status so you can track your pipeline.
            </p>
          </div>
          <ApplicationForm onAddApplication={handleAddApplication} />
        </section>

        {/* Application list */}
        <section className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Your applications</h2>
              <p className="mt-1 text-sm text-slate-400">
                Filter and manage your current job search pipeline.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <label htmlFor="statusFilter" className="text-sm font-medium text-slate-200">
                Filter by status
              </label>
              <select
                id="statusFilter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="cursor-pointer rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
              >
                <option value="all">All</option>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="rejected">Rejected</option>
                <option value="offer">Offer</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/20 px-6 py-12 text-center text-slate-300">
              Loading applications...
            </div>
          ) : (
            <ApplicationList
              applications={filteredApplications}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          )}
        </section>
      </div>
    </main>
  );
}

export default ApplicationsPage;
