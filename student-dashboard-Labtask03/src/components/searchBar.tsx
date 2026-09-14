import { useStudents } from "../context/StudentContext";

function SearchBar() {
  const { searchQuery, setSearchQuery } = useStudents();

  return (
    <input
      type="text"
      placeholder="Search by name or major..."
      value={searchQuery}
      onChange={(e) => {
        setSearchQuery(e.target.value);
      }}
      className="w-full max-w-md px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary"
    />
  );
}

export default SearchBar;