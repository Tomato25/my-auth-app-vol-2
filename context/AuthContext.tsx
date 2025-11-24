"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter, useParams, usePathname  } from "next/navigation";

type User = {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname(); 
  const params = useParams(); // returns { locale: "en" } for example
  const locale = params.locale;

    async function verifyAuth() {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          localStorage.removeItem("token");
          setUser(null);
        }
      } catch (error) {
        console.error("Auth verification failed:", error);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    useEffect(() => {
    verifyAuth();
  }, [pathname]);

   
  async function login(email: string, password: string) {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Login failed");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    setUser(data.user);
    router.push(`/${locale}/employees`);
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    router.replace(`/${locale}/login`);
    router.refresh()
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error('useAuth must be used within AuthProvider')
    }

    return context
}
