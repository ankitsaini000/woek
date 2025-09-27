"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { API_CONFIG, getApiUrl } from "@/config/api";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
}

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  authToken: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = API_CONFIG.BASE_URL;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const isAuthenticated = !!user;
  const authToken = typeof window !== 'undefined' ? localStorage.getItem("authToken") : null;

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          const response = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            localStorage.removeItem("authToken");
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("authToken");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const signInUrl = getApiUrl(API_CONFIG.ENDPOINTS.AUTH.SIGNIN);
      console.log("Attempting sign in to:", signInUrl);
      const response = await fetch(signInUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Sign in response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Sign in failed");
      }

      // Store token and user data
      localStorage.setItem("authToken", data.token);
      setUser(data.user);
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  const signUp = async (data: SignUpData) => {
    try {
      const signUpUrl = getApiUrl(API_CONFIG.ENDPOINTS.AUTH.SIGNUP);
      console.log("Attempting sign up to:", signUpUrl);
      const response = await fetch(signUpUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Sign up response:", result);

      if (!response.ok) {
        throw new Error(result.message || "Sign up failed");
      }

      // Store token and user data
      localStorage.setItem("authToken", result.token);
      setUser(result.user);
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  };

  const signOut = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    router.push("/auth/signin");
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    authToken,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
