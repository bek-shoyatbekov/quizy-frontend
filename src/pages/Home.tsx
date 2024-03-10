/** @format */

import "./Home.css";
import { useEffect, useState } from "react";
import QuizCard from "../components/QuizCard";
import getQuizzes from "../api-calls/quiz/get-quizzes";
import { useAuthStore } from "../contexts/auth/AuthStore";
import { Quiz } from "../interfaces/quiz.interface";

function Home() {
  const [quizList, setQuizList] = useState<Quiz[]>();

  const { user } = useAuthStore.getState();

  useEffect(() => {
    async function getAllQuizzes() {
      const data = await getQuizzes(user?.token as string);

      setQuizList(data);
    }
    getAllQuizzes();
  }, [user?.token]);

  return (
    <div className="home">
      <div className="quiz-list">
        {quizList?.map((quiz) => (
          <QuizCard
            key={quiz._id}
            _id={quiz._id!}
            title={quiz.title}
            imageUrl={quiz.imageUrl!}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
