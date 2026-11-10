import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import type { User, AuthMode, LscRole } from "../types/auth";

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  authModalOpen: boolean;
  authModalMode: AuthMode;
  profileModalOpen: boolean;
  openAuthModal: (mode?: AuthMode) => void;
  closeAuthModal: () => void;
  openProfileModal: () => void;
  closeProfileModal: () => void;
  setAuthModalMode: (mode: AuthMode) => void;
  login: (email: string, password: string) => { success: boolean; error?: string };
  loginAsDemo: () => void;
  register: (data: {
    name: string;
    email: string;
    password: string;
    role: LscRole;
    level: "Nivel inicial" | "Nivel intermedio" | "Nivel avanzado";
  }) => { success: boolean; error?: string };
  logout: () => void;
  updateUserPreferences: (prefs: Partial<User["accessibility"]>) => void;
}

const STORAGE_USERS_KEY = "manos_lsc_users_v1";
const STORAGE_CURRENT_KEY = "manos_lsc_current_user_v1";

const DEMO_USER: User = {
  id: "user-demo-1",
  name: "Valentina Ruiz",
  email: "valentina@ejemplo.com",
  password: "password123",
  role: "oyente",
  roleLabel: "Persona oyente aprendiendo LSC",
  level: "Nivel inicial",
  initials: "VR",
  avatarBg: "#f0ae7f",
  joinedDate: "Marzo 2025",
  stats: {
    completedLessons: 4,
    totalLessons: 12,
    weeklyGoal: 6,
    weeklyCompleted: 4,
    streakDays: 5,
    signsLearned: 18,
  },
  accessibility: {
    subtitles: true,
    highContrast: false,
    reducedMotion: false,
    visualAlerts: true,
  },
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return (name.slice(0, 2) || "US").toUpperCase();
}

const AVATAR_COLORS = ["#f0ae7f", "#6fd7b5", "#8a8cff", "#ef896f", "#b58bf5", "#f7bf53"];

function getRandomColor(): string {
  return AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_USERS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return [DEMO_USER];
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CURRENT_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    // Default logged in as Valentina for an immediately rich experience
    return DEMO_USER;
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<AuthMode>("login");
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Sync users to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    } catch (e) {
      console.error("Error saving users to localStorage", e);
    }
  }, [users]);

  // Sync currentUser to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_CURRENT_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_CURRENT_KEY);
      }
    } catch (e) {
      console.error("Error saving current user to localStorage", e);
    }
  }, [currentUser]);

  const openAuthModal = (mode: AuthMode = "login") => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const openProfileModal = () => {
    setProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setProfileModalOpen(false);
  };

  const login = (email: string, password: string): { success: boolean; error?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const user = users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      return { success: false, error: "No encontramos ninguna cuenta con ese correo electrónico." };
    }

    if (user.password && user.password !== password) {
      return { success: false, error: "Contraseña incorrecta. Inténtalo de nuevo." };
    }

    setCurrentUser(user);
    setAuthModalOpen(false);
    return { success: true };
  };

  const loginAsDemo = () => {
    const demo = users.find((u) => u.email === DEMO_USER.email) || DEMO_USER;
    setCurrentUser(demo);
    setAuthModalOpen(false);
  };

  const register = ({
    name,
    email,
    password,
    role,
    level,
  }: {
    name: string;
    email: string;
    password: string;
    role: LscRole;
    level: "Nivel inicial" | "Nivel intermedio" | "Nivel avanzado";
  }): { success: boolean; error?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const exists = users.some((u) => u.email.toLowerCase() === cleanEmail);

    if (exists) {
      return {
        success: false,
        error: "Ya existe una cuenta con este correo. Por favor inicia sesión.",
      };
    }

    const roleLabels: Record<LscRole, string> = {
      oyente: "Persona oyente aprendiendo LSC",
      sordo: "Persona sorda / Comunidad Sorda",
      educador: "Familiar o Educador",
      interprete: "Intérprete en formación",
      otro: "Curioso / Estudiante",
    };

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      password,
      role,
      roleLabel: roleLabels[role] || "Estudiante de LSC",
      level,
      initials: getInitials(name),
      avatarBg: getRandomColor(),
      joinedDate: "Hoy",
      stats: {
        completedLessons: 0,
        totalLessons: 12,
        weeklyGoal: 5,
        weeklyCompleted: 0,
        streakDays: 1,
        signsLearned: 0,
      },
      accessibility: {
        subtitles: true,
        highContrast: false,
        reducedMotion: false,
        visualAlerts: true,
      },
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    setAuthModalOpen(false);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setProfileModalOpen(false);
  };

  const updateUserPreferences = (prefs: Partial<User["accessibility"]>) => {
    if (!currentUser) return;
    const updated = {
      ...currentUser,
      accessibility: {
        ...currentUser.accessibility,
        ...prefs,
      },
    };
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  };

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated: !!currentUser,
      authModalOpen,
      authModalMode,
      profileModalOpen,
      openAuthModal,
      closeAuthModal,
      openProfileModal,
      closeProfileModal,
      setAuthModalMode,
      login,
      loginAsDemo,
      register,
      logout,
      updateUserPreferences,
    }),
    [currentUser, authModalOpen, authModalMode, profileModalOpen, users],
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
