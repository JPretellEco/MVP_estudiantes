import { Link } from "react-router";
import { Search, Filter } from "lucide-react";
import { useState } from "react";
import { teachers } from "../data/mockData";
import { StarRating } from "./StarRating";

export function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const departments = ["all", ...new Set(teachers.map((t) => t.department))];

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subjects.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDepartment =
      selectedDepartment === "all" || teacher.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Encuentra y evalúa a tus docentes
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Comparte tu experiencia y ayuda a otros estudiantes a tomar mejores decisiones
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o materia..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white cursor-pointer min-w-[250px]"
          >
            <option value="all">Todos los departamentos</option>
            {departments.slice(1).map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <Link
            key={teacher.id}
            to={`/teacher/${teacher.id}`}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-200"
          >
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={teacher.imageUrl}
                  alt={teacher.name}
                  className="size-16 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate mb-1">
                    {teacher.name}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    {teacher.department}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <StarRating rating={teacher.rating} size={18} />
                  <span className="text-2xl font-bold text-gray-900">
                    {teacher.rating.toFixed(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {teacher.totalReviews} reseñas
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Materias:</p>
                <div className="flex flex-wrap gap-2">
                  {teacher.subjects.slice(0, 2).map((subject) => (
                    <span
                      key={subject}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                    >
                      {subject}
                    </span>
                  ))}
                  {teacher.subjects.length > 2 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{teacher.subjects.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredTeachers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No se encontraron docentes con los criterios seleccionados
          </p>
        </div>
      )}
    </div>
  );
}
