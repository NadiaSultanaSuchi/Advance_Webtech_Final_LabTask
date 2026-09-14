import PropTypes from "prop-types";
import { useStudents } from "../context/StudentContext";
import { useTheme } from "../context/ThemeContext";

function DashboardHeader(props: { title: string; tagline: string }) {
  const { favorites } = useStudents();
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`p-6 rounded-b-xl text-white ${
        theme === "dark" ? "bg-slate-900" : "bg-primary"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{props.title}</h1>
          <p className="text-indigo-100 mt-2">{props.tagline}</p>
        </div>

        <button
          onClick={toggleTheme}
          className="shrink-0 px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-sm font-semibold"
        >
          {theme === "light" ? "🌙 Dark mode" : "☀️ Light mode"}
        </button>
      </div>

      <p className="text-indigo-100 mt-1 text-sm">
        {favorites.length} student(s) marked as favorite
      </p>

      <nav className="flex gap-4 mt-4">
        <a className="font-semibold hover:underline" href="#">Dashboard</a>
        <a className="font-semibold hover:underline" href="#">Students</a>
        <a className="font-semibold hover:underline" href="#">Courses</a>
      </nav>
    </div>
  );
}

DashboardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
};

export default DashboardHeader;