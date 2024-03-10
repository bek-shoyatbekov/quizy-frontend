/** @format */

import api from "..";
import { Quiz } from "../../interfaces/quiz.interface";

const getQuizzes = async (firebaseToken: string): Promise<Quiz[]> => {
  try {
    const response = await api.get("/quiz/all", {
      headers: {
        authorization: firebaseToken,
      },
    });
    return response.data?.data;
  } catch (err) {
    console.log("Error logging in", err);
    throw err;
  }
};

export default getQuizzes;
