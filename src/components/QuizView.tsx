/** @format */
import React from "react";
import { useOutletContext } from "react-router-dom";
import { QuestionViewContextType } from "../interfaces/quiz.interface";
import "./QuizView.css";

const QuestionView: React.FC = () => {
  const { question, handleUserAnswer, handleNextQuestion, timeRemaining } =
    useOutletContext<QuestionViewContextType>();

  const handleOptionClick = (optionIndex: number) => {
    handleUserAnswer(optionIndex);
    handleNextQuestion();
  };

  return (
    <div className="question-container">
      <h2 className="question-text">{question.text}</h2>
      <p className="time-limit">
        <strong className="time">{timeRemaining}</strong> seconds left
      </p>
      <ul className="options-list">
        {question.options.map((option, index) => (
          <li key={index}>
            <button onClick={() => handleOptionClick(index)}>{option}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionView;
