import PropTypes from "prop-types";
import StatBadge from "./statBadge";
import CourseTag from "./courseTag";

export type Course = {
  name: string;
  color: string;
};

function StudentCard(props: {
  name: string;
  id: number;
  avatar: string;
  gpa: number;
  major: string;
  credits: number;
  courses: Course[];
}) {
  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <div className="flex items-center gap-4">
        <img
          className="w-14 h-14 rounded-full object-cover bg-slate-100"
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${props.name}&top=longHairStraight,longHairCurly,longHairBun,longHairBigHair&facialHairProbability=0&accessoriesProbability=20`}
          alt={props.name}
        />
        <div>
          <p className="text-lg font-bold">{props.name}</p>
          <p className="text-muted">{props.major}</p>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <StatBadge label="GPA" value={props.gpa} />
        <StatBadge label="Credits" value={props.credits} />
      </div>

      <div className="flex flex-wrap gap-1.5 mt-4">
        {props.courses.map((course) => (
          <CourseTag key={course.name} courseName={course.name} color={course.color} />
        ))}
      </div>
    </div>
  );
}

StudentCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
  gpa: PropTypes.number.isRequired,
  major: PropTypes.string.isRequired,
  credits: PropTypes.number.isRequired,
  courses: PropTypes.array.isRequired,
};

export default StudentCard;