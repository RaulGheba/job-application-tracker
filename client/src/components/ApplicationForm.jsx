import { useState } from "react";

function ApplicationForm({ onAddApplication }) {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "applied",
    notes: "",
    link: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddApplication(formData);

    setFormData({
      company: "",
      role: "",
      status: "applied",
      notes: "",
      link: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
      {/* Company */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-slate-300">Company</label>
        <input
          type="text"
          name="company"
          placeholder="Company name"
          value={formData.company}
          onChange={handleChange}
          required
          className="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2.5 text-sm text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
        />
      </div>

      {/* Role */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-slate-300">Role</label>
        <input
          type="text"
          name="role"
          placeholder="Frontend Developer"
          value={formData.role}
          onChange={handleChange}
          required
          className="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2.5 text-sm text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
        />
      </div>

      {/* Status */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-slate-300">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="cursor-pointer rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2.5 text-sm text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
        >
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="rejected">Rejected</option>
          <option value="offer">Offer</option>
        </select>
      </div>

      {/* Job Link */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-slate-300">Job Link</label>
        <input
          type="text"
          name="link"
          placeholder="https://company.com/job"
          value={formData.link}
          onChange={handleChange}
          className="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2.5 text-sm text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
        />
      </div>

      {/* Notes */}
      <div className="flex flex-col gap-1 md:col-span-2">
        <label className="text-sm text-slate-300">Notes</label>
        <textarea
          name="notes"
          placeholder="Interview feedback, salary range, recruiter info..."
          value={formData.notes}
          onChange={handleChange}
          rows="3"
          className="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2.5 text-sm text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
        />
      </div>

      {/* Submit */}
      <div className="md:col-span-2 flex justify-end pt-2">
        <button
          type="submit"
          className="cursor-pointer rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 active:scale-[0.98]"
        >
          Add Application
        </button>
      </div>
    </form>
  );
}

export default ApplicationForm;
