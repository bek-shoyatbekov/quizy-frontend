/** @format */

import api from "..";
import { Quiz } from "../../interfaces/quiz.interface";

const getByQuizById = async (
  firebaseToken: string,
  quizId: string
): Promise<Quiz> => {
  try {
    console.log("firebase token : ", firebaseToken);
    const response = await api.get(`/quiz/single?quizId=` + quizId, {
      headers: {
        authorization: firebaseToken,
      },
    });

    const quiz = response.data?.data as Quiz;
    console.log("Quiz in feting", quiz);
    return quiz;
  } catch (err) {
    console.log("Error fetching a quiz", err);
    throw err;
  }
};

export default getByQuizById;
