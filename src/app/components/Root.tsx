import { Outlet, Link, useLocation } from "react-router";
import { GraduationCap, FileText, Home, LogOut, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function Root() {
  const location = useLocation();
  const { username, logout } = useAuth();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <GraduationCap className="size-8 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">EduRate</h1>
            </div>
            
            <nav className="flex gap-1">
              <Link
                to="/"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive("/") && location.pathname === "/"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Home className="size-5" />
                <span>Docentes</span>
              </Link>
              <Link
                to="/files"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive("/files")
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <FileText className="size-5" />
                <span>Archivos</span>
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                <User className="size-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{username}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Cerrar sesión"
              >
                <LogOut className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            © 2026 EduRate - Plataforma de evaluación docente
          </p>
        </div>
      </footer>
    </div>
  );
}