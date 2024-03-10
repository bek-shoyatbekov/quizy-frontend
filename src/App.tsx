/** @format */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddQuiz from "./pages/AddQuiz";
import QuestionView from "./components/QuizView";
import QuizPage from "./pages/Quiz";
import ResultsView from "./components/ResultView";

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-quiz" element={<AddQuiz />} />
          <Route path="/quiz/:quizId" element={<QuizPage />}>
            <Route path="" element={<QuestionView />} />
          </Route>
          <Route path="/quiz/results" element={<ResultsView />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
