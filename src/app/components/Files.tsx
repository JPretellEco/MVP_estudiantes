import { useState } from "react";
import { Upload, Eye, FileText, Search, Filter, Clipboard, FlaskConical } from "lucide-react";
import { sharedFiles } from "../data/mockData";
import { FileViewer } from "./FileViewer";

export function Files() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedFileType, setSelectedFileType] = useState<"all" | "examen" | "laboratorio">("all");
  const [selectedExamCategory, setSelectedExamCategory] = useState<"all" | "regular" | "aplazado" | "sustitutorio">("all");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [viewingFile, setViewingFile] = useState<{ name: string; type: string } | null>(null);
  const [uploadData, setUploadData] = useState({
    fileName: "",
    subject: "",
    teacher: "",
    fileType: "examen" as "examen" | "laboratorio",
    examCategory: "regular" as "regular" | "aplazado" | "sustitutorio",
  });

  const subjects = ["all", ...new Set(sharedFiles.map((f) => f.subject))];

  const filteredFiles = sharedFiles.filter((file) => {
    const matchesSearch =
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === "all" || file.subject === selectedSubject;
    const matchesFileType = selectedFileType === "all" || file.fileType === selectedFileType;
    const matchesExamCategory = 
      selectedExamCategory === "all" || 
      file.examCategory === selectedExamCategory;
    return matchesSearch && matchesSubject && matchesFileType && matchesExamCategory;
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock upload - en producción esto subiría a Supabase Storage
    alert("¡Archivo subido! (Esta es una versión demo)");
    setShowUploadForm(false);
    setUploadData({ fileName: "", subject: "", teacher: "", fileType: "examen", examCategory: "regular" });
  };

  const handleDownload = (fileName: string) => {
    // Mock download
    alert(`Descargando: ${fileName} (Esta es una versión demo)`);
  };

  const getFileIcon = (type: string) => {
    return <FileText className="size-8 text-blue-500" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Archivos compartidos
        </h1>
        <p className="text-gray-600">
          Comparte y visualiza material de estudio, apuntes y recursos
        </p>
      </div>

      {/* Upload Button */}
      {!showUploadForm && (
        <button
          onClick={() => setShowUploadForm(true)}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium mb-6 flex items-center justify-center gap-2"
        >
          <Upload className="size-5" />
          Subir archivo
        </button>
      )}

      {/* Upload Form */}
      {showUploadForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Subir nuevo archivo
          </h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Archivo
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <Upload className="size-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600 mb-1">
                  Haz clic para seleccionar o arrastra el archivo aquí
                </p>
                <p className="text-xs text-gray-500">
                  PDF, DOCX, ZIP (Máx. 10MB)
                </p>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx,.zip"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setUploadData({ ...uploadData, fileName: e.target.files[0].name });
                    }
                  }}
                />
              </div>
              {uploadData.fileName && (
                <p className="text-sm text-gray-600 mt-2">
                  Archivo seleccionado: {uploadData.fileName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Materia
              </label>
              <input
                type="text"
                value={uploadData.subject}
                onChange={(e) =>
                  setUploadData({ ...uploadData, subject: e.target.value })
                }
                required
                placeholder="Ej: Algoritmos"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Docente
              </label>
              <input
                type="text"
                value={uploadData.teacher}
                onChange={(e) =>
                  setUploadData({ ...uploadData, teacher: e.target.value })
                }
                required
                placeholder="Ej: Dr. María González"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de archivo
              </label>
              <select
                value={uploadData.fileType}
                onChange={(e) =>
                  setUploadData({ ...uploadData, fileType: e.target.value as "examen" | "laboratorio" })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="examen">Examen</option>
                <option value="laboratorio">Laboratorio</option>
              </select>
            </div>

            {uploadData.fileType === "examen" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría de examen
                </label>
                <select
                  value={uploadData.examCategory}
                  onChange={(e) =>
                    setUploadData({ ...uploadData, examCategory: e.target.value as "regular" | "aplazado" | "sustitutorio" })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="regular">Regular</option>
                  <option value="aplazado">Aplazado</option>
                  <option value="sustitutorio">Sustitutorio</option>
                </select>
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Subir archivo
              </button>
              <button
                type="button"
                onClick={() => setShowUploadForm(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar archivos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white cursor-pointer min-w-[200px]"
          >
            <option value="all">Todas las materias</option>
            {subjects.slice(1).map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
          <select
            value={selectedFileType}
            onChange={(e) => setSelectedFileType(e.target.value as "all" | "examen" | "laboratorio")}
            className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white cursor-pointer min-w-[200px]"
          >
            <option value="all">Todos los tipos</option>
            <option value="examen">Examen</option>
            <option value="laboratorio">Laboratorio</option>
          </select>
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
          <select
            value={selectedExamCategory}
            onChange={(e) => setSelectedExamCategory(e.target.value as "all" | "regular" | "aplazado" | "sustitutorio")}
            className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white cursor-pointer min-w-[200px]"
          >
            <option value="all">Todas las categorías</option>
            <option value="regular">Regular</option>
            <option value="aplazado">Aplazado</option>
            <option value="sustitutorio">Sustitutorio</option>
          </select>
        </div>
      </div>

      {/* Files List */}
      <div className="space-y-3">
        {filteredFiles.map((file) => (
          <div
            key={file.id}
            className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow border border-gray-200"
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">{getFileIcon(file.type)}</div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-gray-900 truncate">
                    {file.name}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    file.fileType === "examen" 
                      ? "bg-purple-100 text-purple-700" 
                      : "bg-green-100 text-green-700"
                  }`}>
                    {file.fileType === "examen" ? "📝 Examen" : "🔬 Laboratorio"}
                  </span>
                  {file.fileType === "examen" && file.examCategory && (
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      file.examCategory === "regular" 
                        ? "bg-blue-100 text-blue-700" 
                        : file.examCategory === "aplazado"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {file.examCategory.charAt(0).toUpperCase() + file.examCategory.slice(1)}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <FileText className="size-4" />
                    {file.type}
                  </span>
                  <span>•</span>
                  <span>{file.subject}</span>
                  <span>•</span>
                  <span>{file.teacher}</span>
                  <span>•</span>
                  <span>{file.size}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
                  <span>Subido por {file.uploadedBy}</span>
                  <span>•</span>
                  <span>
                    {new Date(file.uploadDate).toLocaleDateString("es-ES")}
                  </span>
                  <span>•</span>
                  <span>{file.downloads} visualizaciones</span>
                </div>
              </div>

              <button
                onClick={() => setViewingFile({ name: file.name, type: file.type })}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Eye className="size-4" />
                <span>Ver</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredFiles.length === 0 && (
        <div className="text-center py-12">
          <FileText className="size-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">
            No se encontraron archivos con los criterios seleccionados
          </p>
        </div>
      )}

      {viewingFile && (
        <FileViewer
          fileName={viewingFile.name}
          fileType={viewingFile.type}
          onClose={() => setViewingFile(null)}
        />
      )}
    </div>
  );
}