import { useState, useEffect } from "react";
import "./index.css";
import DashboardHeader from "./components/dashboardHeader";
import StudentCard from "./components/studentCard";
import SearchBar from "./components/searchBar";
import SortControls from "./components/sortControls";

export type Student = {
  id: number;
  name: string;
  avatar: string;
  gpa: number;
  credits: number;
  major: string;
  courses: { name: string; color: string }[];
};

const initialStudents: Student[] = [
  {
    id: 1,
    name: "Nadia",
    avatar: "",
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
    avatar: "",
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
    avatar: "",
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
    avatar: "",
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
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("default");
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStudents(initialStudents);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filteredStudents = students.filter((student) => {
    const query = searchQuery.toLowerCase();
    return (
      student.name.toLowerCase().includes(query) ||
      student.major.toLowerCase().includes(query)
    );
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "gpa") {
      return b.gpa - a.gpa;
    }
    return 0;
  });

  useEffect(() => {
    document.title = `Dashboard — ${filteredStudents.length} Students`;
  }, [filteredStudents.length]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <DashboardHeader
        title="Student Dashboard"
        tagline="Track performance at a glance"
        favoriteCount={favorites.length}
      />

      <div className="p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <SortControls sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      <div className="px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedStudents.map((student) => (
          <StudentCard
            key={student.id}
            name={student.name}
            id={student.id}
            avatar={student.avatar}
            gpa={student.gpa}
            credits={student.credits}
            major={student.major}
            courses={student.courses}
            isFavorite={favorites.includes(student.id)}
            onToggleFavorite={() => {
              toggleFavorite(student.id);
            }}
          />
        ))}
      </div>
    </>
  );
}

export default App;