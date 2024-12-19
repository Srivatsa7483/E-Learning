export interface Quiz {
  id: string;
  title: string;
  duration: number; // in minutes
  questions: Question[];
  scheduledFor?: Date;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  duration: number;
  scheduledFor: Date;
  totalMarks: number;
}

export interface User {
  id: string;
  name: string;
  role: 'student' | 'teacher';
  email: string;
}