import PropTypes from "prop-types";

function SortControls(props: { sortBy: string; onSortChange: (value: string) => void }) {
  const options = [
    { value: "default", label: "Default" },
    { value: "name", label: "Name (A-Z)" },
    { value: "gpa", label: "GPA (High to Low)" },
  ];

  return (
    <div className="flex gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => {
            props.onSortChange(option.value);
          }}
          className={
            props.sortBy === option.value
              ? "px-3 py-1.5 rounded-lg bg-primary text-white text-sm font-semibold"
              : "px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-sm font-semibold"
          }
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

SortControls.propTypes = {
  sortBy: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default SortControls;