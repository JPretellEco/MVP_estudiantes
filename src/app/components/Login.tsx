import { useState } from "react";
import { useNavigate } from "react-router";
import { GraduationCap, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const [username, setUsername] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      login(username.trim());
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 rounded-full p-4">
              <GraduationCap className="size-12 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
            Bienvenido a EduRate
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Ingresa de forma anónima con un nombre de usuario
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nombre de usuario
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ej: estudiante123"
                  required
                  minLength={3}
                  maxLength={20}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                * Tu identidad permanecerá anónima
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Ingresar
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Nota:</strong> No necesitas contraseña. Solo ingresa un nombre de
              usuario para acceder de forma anónima a la plataforma.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
