import { useEffect } from "react";
import "./index.css";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { StudentProvider, useStudents } from "./context/StudentContext";
import DashboardHeader from "./components/dashboardHeader";
import StudentCard from "./components/studentCard";
import SearchBar from "./components/searchBar";
import SortControls from "./components/sortControls";
import AddStudentForm from "./components/addStudentForm";

function DashboardContent() {
  const { filteredStudents, loading } = useStudents();
  const { theme } = useTheme();

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
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-950 text-white" : "bg-bg"}`}>
      <DashboardHeader
        title="Student Dashboard"
        tagline="Track performance at a glance"
      />

      <div className="p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <SearchBar />
        <SortControls />
      </div>

      <div className="px-6 pb-6">
        <AddStudentForm />
      </div>

      <div className="px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <StudentProvider>
        <DashboardContent />
      </StudentProvider>
    </ThemeProvider>
  );
}

export default App;