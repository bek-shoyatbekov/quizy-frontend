/** @format */

import api from "..";
import { QuizResult } from "../../interfaces/quiz.interface";

const saveUserQuizResult = async (
  quizResult: QuizResult,
  firebaseToken: string
) => {
  try {
    const response = await api.post(
      "/result",
      { quiz: quizResult },
      {
        headers: {
          authorization: firebaseToken,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log("Error adding new quiz", err);
    throw err;
  }
};

export default saveUserQuizResult;
