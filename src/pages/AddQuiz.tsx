/** @format */

import React, { useState } from "react";
import "./AddQuiz.css";
import { Quiz, QuizQuestion } from "../interfaces/quiz.interface";
import { useAuthStore } from "../contexts/auth/AuthStore";
import addQuiz from "../api-calls/quiz/add-quiz";
import { toast } from "react-toastify";
import handleError from "../utils/error/error-handler";
import { useNavigate } from "react-router-dom";

const AddQuiz = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const navigate = useNavigate();

  const { user } = useAuthStore.getState();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  const handleQuestionTextChange = (index: number, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, i) =>
        i === index ? { ...question, text: value } : question
      )
    );
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, i) =>
        i === questionIndex
          ? {
              ...question,
              options: question.options.map((option, j) =>
                j === optionIndex ? value : option
              ),
            }
          : question
      )
    );
  };

  const handleTimeLimitChange = (index: number, value: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, i) =>
        i === index ? { ...question, timeLimit: value } : question
      )
    );
  };

  const handleCorrectAnswerChange = (index: number, value: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, i) =>
        i === index ? { ...question, correctAnswer: value } : question
      )
    );
  };

  const handleAddQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { text: "", options: ["", "", "", ""], timeLimit: 60, correctAnswer: 1 },
    ]);
  };

  const handleSubmit = async () => {
    try {
      const quiz: Quiz = {
        title,
        imageUrl,
        questions,
      };
      if (!user) {
        toast.warn("Please login first", {
          autoClose: 1000,
        });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
        return null;
      }
      await addQuiz(quiz, user?.token as string);

      toast.success("Quiz submitted successfully");
    } catch (err) {
      console.error("Failed to submit quiz:", err);
      const errMessage = handleError(err);
      toast.error(errMessage);
    }
  };

  return (
    <div className="add-quiz-container">
      <h2 className="add-quiz-title">Add Quiz</h2>
      <div className="add-quiz-form-group">
        <label>
          Title:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
      </div>
      <div className="add-quiz-form-group">
        <label>
          Image URL:
          <input type="text" value={imageUrl} onChange={handleImageUrlChange} />
        </label>
      </div>
      <div>
        <h3>Questions</h3>
        {questions.map((question, index) => (
          <div key={index} className="add-quiz-question">
            <div className="add-quiz-form-group">
              <label>
                Question Text:
                <input
                  type="text"
                  value={question.text}
                  onChange={(event) =>
                    handleQuestionTextChange(index, event.target.value)
                  }
                  className="add-quiz-question-text"
                />
              </label>
            </div>
            <div>
              Options:
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="add-quiz-option">
                  <input
                    type="text"
                    value={option}
                    onChange={(event) =>
                      handleOptionChange(index, optionIndex, event.target.value)
                    }
                  />
                </div>
              ))}
            </div>
            <div className="add-quiz-form-group">
              <label>
                Time Limit:
                <input
                  type="number"
                  value={question.timeLimit}
                  onChange={(event) =>
                    handleTimeLimitChange(index, +event.target.value)
                  }
                />
              </label>
            </div>
            <div className="add-quiz-form-group">
              <label>
                Correct Answer:
                <input
                  type="number"
                  value={question.correctAnswer}
                  onChange={(event) =>
                    handleCorrectAnswerChange(index, +event.target.value)
                  }
                />
              </label>
            </div>
          </div>
        ))}
        <button onClick={handleAddQuestion} className="add-quiz-button">
          Add Question
        </button>
      </div>
      <button onClick={handleSubmit} className="add-quiz-button">
        Submit Quiz
      </button>
    </div>
  );
};

export default AddQuiz;
