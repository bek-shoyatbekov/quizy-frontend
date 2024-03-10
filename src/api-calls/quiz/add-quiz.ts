/** @format */

import api from "..";
import { Quiz } from "../../interfaces/quiz.interface";

const addQuiz = async (quizData: Quiz, firebaseToken: string) => {
  
  try {
    const response = await api.post(
      "/quiz",
      { quiz: quizData },
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

export default addQuiz;
