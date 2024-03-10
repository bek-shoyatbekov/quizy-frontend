/** @format */

import { QuizQuestion } from "../../interfaces/quiz.interface";

const calculateQuizResult = (answers: number[], questions: QuizQuestion[]) => {
  let score = 0;
  console.log("aq", answers, questions);
  for (let i = 0; i < answers.length; i++) {
    if (answers[i] == questions[i].correctAnswer) {
      score++;
    }
  }
  return score;
};

export default calculateQuizResult;
