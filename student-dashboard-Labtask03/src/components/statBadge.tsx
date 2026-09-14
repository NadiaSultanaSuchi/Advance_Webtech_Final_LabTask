import PropTypes from "prop-types";

function StatBadge(props: { label: string; value: string | number }) {
  return (
    <span className="bg-slate-100 px-3 py-1 rounded-full text-sm">
      <span className="text-muted mr-1">{props.label}:</span>
      {props.value}
    </span>
  );
}

StatBadge.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default StatBadge;