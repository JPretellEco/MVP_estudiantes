import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  username: string | null;
  login: (username: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Cargar usuario del localStorage si existe
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const login = (newUsername: string) => {
    setUsername(newUsername);
    localStorage.setItem("username", newUsername);
  };

  const logout = () => {
    setUsername(null);
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        login,
        logout,
        isAuthenticated: username !== null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
