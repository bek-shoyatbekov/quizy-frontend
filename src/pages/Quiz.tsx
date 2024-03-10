/** @format */

import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import "./Quiz.css";
import { Quiz } from "../interfaces/quiz.interface";
import getByQuizById from "../api-calls/quiz/get-by-id";
import { useAuthStore } from "../contexts/auth/AuthStore";
import calculateQuizResult from "../utils/quiz/calculate-quiz-result";
import handleError from "../utils/error/error-handler";
import { toast } from "react-toastify";

const QuizPage: React.FC = () => {
  const { quizId } = useParams();
  const { user } = useAuthStore.getState();

  const navigate = useNavigate();
  const [quizData, setQuizData] = useState<Quiz>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(
    quizData?.questions[currentQuestionIndex]?.timeLimit || 0
  );
  const [countdownInterval, setCountdownInterval] =
    useState<NodeJS.Timeout | null>();

  useEffect(() => {
    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
    };
  }, []);

  useEffect(() => {
    // Reset the timer and clear any existing interval when the question changes
    setTimeRemaining(quizData?.questions[currentQuestionIndex]?.timeLimit || 0);

    if (countdownInterval) {
      clearInterval(countdownInterval);
    }

    // Start a new countdown interval
    const newCountdownInterval = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => {
        if (prevTimeRemaining > 0) {
          return prevTimeRemaining - 1;
        } else {
          // Time has run out, move to the next question
          clearInterval(newCountdownInterval);
          handleNextQuestion();
          return 0;
        }
      });
    }, 1000);

    setCountdownInterval(newCountdownInterval);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(newCountdownInterval);
    };
  }, [quizData, currentQuestionIndex]);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const data = await getByQuizById(
          user?.token as string,
          quizId as string
        );

        setQuizData(data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        const errorMsg = handleError(error);
        if (errorMsg === "Unauthorized") navigate("/login");
        toast.error(errorMsg);
      }
    };

    if (!quizData) {
      fetchQuizData();
    }
  });

  const handleUserAnswer = (answer: number) => {
    userAnswers.push(answer);
    setUserAnswers((userAnswers) => [...userAnswers]);
  };

  const handleNextQuestion = () => {
    const currentQuestion = quizData?.questions[currentQuestionIndex];
    const userAnswer = userAnswers[currentQuestionIndex];

    if (
      userAnswer !== null &&
      currentQuestion?.correctAnswer === userAnswer + 1
    ) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex === quizData!.questions.length - 1 && quizData) {
      const userScore = calculateQuizResult(
        userAnswers as number[],
        quizData.questions
      );
      setScore(userScore);

      navigate("/quiz/results", { state: { score, quizId } });
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
    setTimeRemaining(
      quizData?.questions[currentQuestionIndex + 1]?.timeLimit || 0
    );
  };

  return (
    <div className="quiz-container">
      {quizData ? (
        <>
          <div className="quiz-header">
            {quizData.imageUrl && (
              <img className="quiz-image" src={quizData.imageUrl} alt="Quiz" />
            )}
            <h1>{quizData.title}</h1>
          </div>
          <Outlet
            context={{
              question: quizData.questions[currentQuestionIndex],
              handleUserAnswer,
              handleNextQuestion,
              timeRemaining,
            }}
          />
        </>
      ) : (
        <p>Loading quiz...</p>
      )}
    </div>
  );
};

export default QuizPage;
