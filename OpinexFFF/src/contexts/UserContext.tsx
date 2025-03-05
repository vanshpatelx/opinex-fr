
import { createContext, useContext, useState, ReactNode } from "react";

// Define types
export type UserRole = "user" | "admin";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  balance: number;
  role: UserRole;
  avatar?: string;
}

interface UserContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (userData: UserProfile) => void;
  logout: () => void;
  updateBalance: (newBalance: number) => void;
  addBalance: (amount: number) => void;
}

// Create context with default values
const UserContext = createContext<UserContextType>({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
  updateBalance: () => {},
  addBalance: () => {},
});

// Custom hook for using the context
export const useUser = () => useContext(UserContext);

// Mock user data (for development)
const mockUsers: UserProfile[] = [
  {
    id: "1",
    name: "John Doe",
    email: "user@gmail.com",  // Updated for demo purposes
    balance: 5000,
    role: "user",
    avatar: "https://i.pravatar.cc/150?u=john"
  },
  {
    id: "2", 
    name: "Jane Smith",
    email: "admin@gmail.com", // Updated for demo purposes
    balance: 8500,
    role: "admin",
    avatar: "https://i.pravatar.cc/150?u=jane"
  }
];

// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Check localStorage for user session on mount
  const storedUser = localStorage.getItem("user");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  const [user, setUser] = useState<UserProfile | null>(initialUser);
  
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  const login = (userData: UserProfile) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateBalance = (newBalance: number) => {
    if (user) {
      const updatedUser = { ...user, balance: newBalance };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };
  
  const addBalance = (amount: number) => {
    if (user) {
      const updatedUser = { ...user, balance: user.balance + amount };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        isAdmin,
        login,
        logout,
        updateBalance,
        addBalance
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
