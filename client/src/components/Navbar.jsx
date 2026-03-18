import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLink = ({ isActive }) =>
    `rounded-lg px-4 py-2 text-sm font-medium transition cursor-pointer ${
      isActive ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-500/30">
            JT
          </div>
          <span className="text-base font-semibold text-white">Job Tracker</span>
        </NavLink>

        <nav className="flex items-center gap-1">
          <NavLink to="/" end className={navLink}>Home</NavLink>
          <NavLink to="/applications" className={navLink}>Applications</NavLink>
          <NavLink to="/about" className={navLink}>About</NavLink>

          {user ? (
            <button
              onClick={handleLogout}
              className="ml-2 cursor-pointer rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              Log out
            </button>
          ) : (
            <NavLink
              to="/login"
              className="ml-2 cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Sign in
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
