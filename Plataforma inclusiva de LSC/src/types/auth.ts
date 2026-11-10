export type LscRole = "oyente" | "sordo" | "educador" | "interprete" | "otro";

export interface AccessibilityPreferences {
  subtitles: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  visualAlerts: boolean;
}

export interface UserStats {
  completedLessons: number;
  totalLessons: number;
  weeklyGoal: number;
  weeklyCompleted: number;
  streakDays: number;
  signsLearned: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: LscRole;
  roleLabel: string;
  level: "Nivel inicial" | "Nivel intermedio" | "Nivel avanzado";
  initials: string;
  avatarBg: string;
  joinedDate: string;
  stats: UserStats;
  accessibility: AccessibilityPreferences;
}

export type AuthMode = "login" | "register" | "forgot";
