import { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [status, setStatus] = useState("loading"); // "loading" | "authenticated" | "anonymous"

  useEffect(() => {
    let activo = true;
    authService
      .me()
      .then((data) => {
        if (activo) {
          setAdmin(data);
          setStatus("authenticated");
        }
      })
      .catch(() => {
        if (activo) {
          setAdmin(null);
          setStatus("anonymous");
        }
      });
    return () => {
      activo = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      admin,
      isLoading: status === "loading",
      isAuthenticated: status === "authenticated",
      login: (username, password) =>
        authService.login(username, password).then((data) => {
          setAdmin(data);
          setStatus("authenticated");
        }),
      logout: () =>
        authService.logout().finally(() => {
          setAdmin(null);
          setStatus("anonymous");
        }),
    }),
    [admin, status]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
