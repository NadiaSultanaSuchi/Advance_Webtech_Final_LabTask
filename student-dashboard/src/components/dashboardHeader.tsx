import PropTypes from "prop-types";

function DashboardHeader(props: { title: string; tagline: string }) {
  return (
    <div className="bg-primary text-white p-6 rounded-b-xl">
      <h1 className="text-2xl font-bold">{props.title}</h1>
      <p className="text-indigo-100 mt-2">{props.tagline}</p>
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