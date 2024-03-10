/** @format */

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResultView.css";
import saveUserQuizResult from "../api-calls/quiz/save-user-result";
import { useAuthStore } from "../contexts/auth/AuthStore";

interface ResultsViewProps {
  score: number;
  quizId: string;
}

const ResultsView: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, quizId } = location.state as ResultsViewProps;

  const { user } = useAuthStore.getState();

  const handleRetakeQuiz = () => {
    navigate(`/quiz/${quizId}`);
  };

  useEffect(() => {
    async function saveUserResult() {
      try {
        const quizResult = {
          quizId,
          score,
        };
        await saveUserQuizResult(quizResult, user?.token as string);
        
      } catch (error) {
        console.error("Error saving user result:", error);
      }
    }

    saveUserResult();
  });

  return (
    <div className="results-container">
      <h2 className="results-score">Your Score: {score}</h2>
      <p className="results-message">
        Congratulations! You have completed the quiz.
      </p>
      <button className="results-button" onClick={handleRetakeQuiz}>
        Retake Quiz
      </button>
    </div>
  );
};

export default ResultsView;
