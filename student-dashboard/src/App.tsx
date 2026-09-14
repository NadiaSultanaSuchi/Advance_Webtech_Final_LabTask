import "./index.css";
import DashboardHeader from "./components/dashboardHeader";
import StudentCard from "./components/studentCard";

export type Student = {
  id: number;
  name: string;
  avatar: string;
  gpa: number;
  credits: number;
  major: string;
  courses: { name: string; color: string }[];
};

const students: Student[] = [
  {
    id: 1,
    name: "Nadia",
    avatar: "https://i.pravatar.cc/100?img=1",
    gpa: 3.8,
    credits: 90,
    major: "Computer Science",
    courses: [
      { name: "Data Structures", color: "#4f46e5" },
      { name: "Algorithms", color: "#059669" },
    ],
  },
  {
    id: 2,
    name: "Sultana",
    avatar: "https://i.pravatar.cc/100?img=2",
    gpa: 3.5,
    credits: 78,
    major: "Software Engineering",
    courses: [
      { name: "Web Development", color: "#dc2626" },
      { name: "Databases", color: "#d97706" },
    ],
  },
  {
    id: 3,
    name: "Suchi",
    avatar: "https://i.pravatar.cc/100?img=3",
    gpa: 3.95,
    credits: 102,
    major: "Data Science",
    courses: [
      { name: "Machine Learning", color: "#7c3aed" },
      { name: "Statistics", color: "#0891b2" },
    ],
  },
  {
    id: 4,
    name: "Tamanna",
    avatar: "https://i.pravatar.cc/100?img=4",
    gpa: 3.2,
    credits: 66,
    major: "Information Systems",
    courses: [
      { name: "Networking", color: "#be185d" },
      { name: "Cloud Computing", color: "#2563eb" },
    ],
  },
];

function App() {
  return (
    <>
      <DashboardHeader title="Student Dashboard" tagline="Track performance at a glance" />
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            name={student.name}
            id={student.id}
            avatar={student.avatar}
            gpa={student.gpa}
            credits={student.credits}
            major={student.major}
            courses={student.courses}
          />
        ))}
      </div>
    </>
  );
}

export default App;