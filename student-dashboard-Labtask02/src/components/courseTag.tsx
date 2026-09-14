import PropTypes from "prop-types";

function CourseTag(props: { courseName: string; color: string }) {
  return (
    <span
      className="px-2.5 py-1 rounded-full text-white text-xs font-semibold"
      style={{ backgroundColor: props.color }}
    >
      {props.courseName}
    </span>
  );
}

CourseTag.propTypes = {
  courseName: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default CourseTag;