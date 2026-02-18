
export type Role = 'student' | 'teacher';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // In a real app, this would be hashed and handled by a backend
  role: Role;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  theory: string;
  codeExample: string;
  challenge: string;
  unlockCode: string;
  questions: Question[];
}

export interface CompletionRecord {
  sectionId: string;
  timestamp: string;
  score: number;
}

export interface UserProgress {
  userId: string;
  userName: string;
  completedSections: CompletionRecord[];
  currentSectionId: string;
}

export type ViewMode = Role;
