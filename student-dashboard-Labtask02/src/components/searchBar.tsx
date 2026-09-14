import PropTypes from "prop-types";

function SearchBar(props: { value: string; onChange: (value: string) => void }) {
  return (
    <input
      type="text"
      placeholder="Search by name or major..."
      value={props.value}
      onChange={(e) => {
        props.onChange(e.target.value);
      }}
      className="w-full max-w-md px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary"
    />
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;