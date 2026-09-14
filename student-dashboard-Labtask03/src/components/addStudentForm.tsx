import { useEffect, useState, type FormEvent } from "react";
import { useStudents } from "../context/StudentContext";
import { useTheme } from "../context/ThemeContext";

type FormErrors = {
  name?: string;
  studentId?: string;
  major?: string;
  gpa?: string;
};

const courseColors = [
  "#4f46e5",
  "#059669",
  "#dc2626",
  "#d97706",
  "#7c3aed",
  "#0891b2",
  "#be185d",
  "#2563eb",
];

function randomCourseColor() {
  return courseColors[Math.floor(Math.random() * courseColors.length)];
}

function AddStudentForm() {
  const { students, addStudent } = useStudents();
  const { theme } = useTheme();

  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [major, setMajor] = useState("");
  const [gpa, setGpa] = useState("");
  const [courses, setCourses] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");

  
  useEffect(() => {
    if (!successMessage) return;

    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    const trimmedId = studentId.trim();

    if (!name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!trimmedId) {
      newErrors.studentId = "Student ID is required.";
    } else if (!/^\d+$/.test(trimmedId)) {
      newErrors.studentId = "Student ID must be numeric.";
    } else if (students.some((student) => student.id === Number(trimmedId))) {
      newErrors.studentId = "Student ID must be unique.";
    }

    if (!major.trim()) {
      newErrors.major = "Major is required.";
    }

    const gpaValue = Number(gpa);
    if (gpa.trim() === "" || Number.isNaN(gpaValue)) {
      newErrors.gpa = "GPA is required.";
    } else if (gpaValue < 0 || gpaValue > 4.0) {
      newErrors.gpa = "GPA must be between 0 and 4.0.";
    }

    return newErrors;
  };

  const resetForm = () => {
    setName("");
    setStudentId("");
    setMajor("");
    setGpa("");
    setCourses("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const courseList = courses
      .split(",")
      .map((course) => course.trim())
      .filter(Boolean)
      .map((courseName) => ({ name: courseName, color: randomCourseColor() }));

    addStudent({
      id: Number(studentId),
      name: name.trim(),
      avatar: "",
      gpa: Number(gpa),
      credits: 0,
      major: major.trim(),
      courses: courseList,
    });

    setSuccessMessage(`${name.trim()} was added successfully.`);
    resetForm();
  };

  const inputClass = `w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary ${
    theme === "dark"
      ? "bg-slate-900 border-slate-600 text-white"
      : "bg-white border-slate-300"
  }`;

  return (
    <div
      className={`rounded-xl p-4 shadow ${
        theme === "dark" ? "bg-slate-800 text-white" : "bg-white"
      }`}
    >
      <h2 className="text-lg font-bold mb-4">Add Student</h2>

      {successMessage && (
        <div className="mb-4 px-3 py-2 rounded-lg bg-green-100 text-green-800 text-sm font-semibold">
          {successMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        noValidate
      >
        <div>
          <label className="block text-sm font-semibold mb-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Student ID</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className={inputClass}
          />
          {errors.studentId && (
            <p className="text-red-500 text-xs mt-1">{errors.studentId}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Major</label>
          <input
            type="text"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            className={inputClass}
          />
          {errors.major && <p className="text-red-500 text-xs mt-1">{errors.major}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">GPA</label>
          <input
            type="text"
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
            placeholder="0.0 - 4.0"
            className={inputClass}
          />
          {errors.gpa && <p className="text-red-500 text-xs mt-1">{errors.gpa}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold mb-1">
            Courses (comma-separated)
          </label>
          <input
            type="text"
            value={courses}
            onChange={(e) => setCourses(e.target.value)}
            placeholder="Data Structures, Algorithms"
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark"
          >
            Add Student
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddStudentForm;