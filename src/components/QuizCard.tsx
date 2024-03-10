/** @format */

import React from "react";

import "./QuizCard.css";
import { useAuthStore } from "../contexts/auth/AuthStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
interface QuizCardProps {
  _id: string;
  title: string;
  imageUrl: string;
}

const QuizCard: React.FC<QuizCardProps> = ({ _id, title, imageUrl }) => {
  const navigate = useNavigate();

  const { user } = useAuthStore.getState();

  async function handleClick() {
    if (!user) {
      toast.warn("Please login first", {
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      return null;
    }

    navigate(`/quiz/${_id}`);
  }
  return (
    <div className="quiz-card" onClick={handleClick}>
      <img src={imageUrl} alt="Quiz Card Image" />
      <h3>{title}</h3>
    </div>
  );
};

export default QuizCard;
