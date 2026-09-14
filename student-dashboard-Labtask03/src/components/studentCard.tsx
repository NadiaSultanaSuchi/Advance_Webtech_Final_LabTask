import PropTypes from "prop-types";
import StatBadge from "./statBadge";
import CourseTag from "./courseTag";
import { useStudents, type Student } from "../context/StudentContext";
import { useTheme } from "../context/ThemeContext";

function StudentCard({ student }: { student: Student }) {
  const { favorites, toggleFavorite, removeStudent } = useStudents();
  const { theme } = useTheme();
  const isFavorite = favorites.includes(student.id);

  return (
    <div
      className={`rounded-xl p-4 shadow ${
        theme === "dark" ? "bg-slate-800 text-white" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            className="w-14 h-14 rounded-full object-cover bg-slate-100"
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}&top=longHairStraight,longHairCurly,longHairBun,longHairBigHair&facialHairProbability=0&accessoriesProbability=20`}
            alt={student.name}
          />
          <div>
            <p className="text-lg font-bold">{student.name}</p>
            <p className={theme === "dark" ? "text-slate-300" : "text-muted"}>
              {student.major}
            </p>
          </div>
        </div>

        <button
          onClick={() => toggleFavorite(student.id)}
          aria-label="Toggle favorite"
          className={`text-2xl leading-none ${
            isFavorite ? "text-amber-400" : "text-slate-300"
          }`}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>

      <div className="flex gap-3 mt-4">
        <StatBadge label="GPA" value={student.gpa} />
        <StatBadge label="Credits" value={student.credits} />
      </div>

      <div className="flex flex-wrap gap-1.5 mt-4">
        {student.courses.map((course) => (
          <CourseTag key={course.name} courseName={course.name} color={course.color} />
        ))}
      </div>

      <button
        onClick={() => removeStudent(student.id)}
        className="mt-4 w-full px-3 py-1.5 rounded-lg border border-red-300 text-red-500 text-sm font-semibold hover:bg-red-50"
      >
        Remove Student
      </button>
    </div>
  );
}

StudentCard.propTypes = {
  student: PropTypes.object.isRequired,
};

export default StudentCard;