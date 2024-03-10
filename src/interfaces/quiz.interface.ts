/** @format */

export interface QuizQuestion {
  text: string;
  options: string[];
  timeLimit: number;
  correctAnswer: number;
}

export interface Quiz {
  _id?: string;
  title: string;
  imageUrl?: string;
  questions: QuizQuestion[];
}

export interface QuestionViewContextType {
  question: QuizQuestion;
  handleUserAnswer: (answer: number) => void;
  handleNextQuestion: () => void;
  timeRemaining: number;
}

export interface QuizResult {
  quizId: string;
  score: number;
}
