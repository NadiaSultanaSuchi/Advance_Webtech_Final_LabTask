import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Course = {
  name: string;
  color: string;
};

export type Student = {
  id: number;
  name: string;
  avatar: string;
  gpa: number;
  credits: number;
  major: string;
  courses: Course[];
};

type StudentContextType = {
  students: Student[];
  loading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
  filteredStudents: Student[];
  addStudent: (student: Student) => void;
  removeStudent: (id: number) => void;
};

const StudentContext = createContext<StudentContextType | undefined>(undefined);

const STORAGE_KEY = "student-dashboard-students";

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

function readStoredStudents(): Student[] | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? (JSON.parse(stored) as Student[]) : null;
}

export function StudentProvider({ children }: { children: ReactNode }) {
  
  const [students, setStudents] = useState<Student[]>(
    () => readStoredStudents() ?? []
  );
  const [loading, setLoading] = useState<boolean>(
    () => readStoredStudents() === null
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("default");
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    if (!loading) return;

    const timer = setTimeout(() => {
      setStudents(initialStudents);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
    
  }, []);

  
  useEffect(() => {
    if (loading) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students, loading]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const addStudent = (student: Student) => {
    setStudents((prev) => [...prev, student]);
  };

  const removeStudent = (id: number) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
    setFavorites((prev) => prev.filter((favId) => favId !== id));
  };

  const filteredStudents = students
    .filter((student) => {
      const query = searchQuery.toLowerCase();
      return (
        student.name.toLowerCase().includes(query) ||
        student.major.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "gpa") return b.gpa - a.gpa;
      return 0;
    });

  const value: StudentContextType = {
    students,
    loading,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    favorites,
    toggleFavorite,
    filteredStudents,
    addStudent,
    removeStudent,
  };

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
}


export function useStudents() {
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error("useStudents must be used within a StudentProvider");
  }

  return context;
}