import { create } from "zustand";
import axios from "axios";

interface AuthStore {
  user: { name: string; email: string } | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: JSON.parse(sessionStorage.getItem("user") || "null"),
  token: sessionStorage.getItem("token"),
  isAuthenticated: !!sessionStorage.getItem("token"),

  login: async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      if (response.data) {
        const { token } = response.data;

        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify({ name: response.data.firstName, email }));

        set({
          user: { name: response.data.firstName, email },
          token,
          isAuthenticated: true,
        });

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    } catch (error) {
      throw new Error("Login failed. Please check your credentials and try again.");
    }
  },

  signup: async (name, email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        { firstName: name, email, password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      if (response.data) {
        const { token } = response.data;

        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify({ name, email }));

        set({
          user: { name, email },
          token,
          isAuthenticated: true,
        });

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    } catch (error) {
      throw new Error("Signup failed. Please try again.");
    }
  },

  logout: () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    set({ user: null, token: null, isAuthenticated: false });
    delete axios.defaults.headers.common["Authorization"];
  },

  refreshToken: async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/auth/refresh-token",
        { withCredentials: true }
      );
      if (response.data) {
        const { token } = response.data;
        sessionStorage.setItem("token", token);
        set({ token, isAuthenticated: true });
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Token refresh failed", error);
      set({ user: null, token: null, isAuthenticated: false });
    }
  },
}));