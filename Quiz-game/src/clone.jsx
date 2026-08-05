import { useState } from "react";
import { quiz } from "./data"; // Make sure your data file exports the array as 'quiz'
import "./App.css";

export function StartScreen({ onStart }) {
  return (
    <div className="screen active" id="start-screen">
      <h1>Quiz Time!</h1>
      <p>Test your knowledge with these fun questions</p>
      <button onClick={onStart} id="start-btn">
        Start Quiz
      </button>
    </div>
  );
}

export function QuizScreen({
  question,
  questionIndex,
  totalQuestions,
  score,
  setScore,
  onNext,
  onFinish,
}) {
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleAnswerClick = (isCorrect, index) => {
    // Prevent clicking multiple times
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedIndex(index);

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    // Wait 1 second before moving to the next question
    setTimeout(() => {
      setIsAnswered(false);
      setSelectedIndex(null);

      if (questionIndex < totalQuestions - 1) {
        onNext();
      } else {
        onFinish();
      }
    }, 1000);
  };

  // Calculate percentage for progress bar
  const progressPercent = (questionIndex / totalQuestions) * 100;

  return (
    <div className="screen active" id="quiz-screen">
      <div className="quiz-header">
        <h2 id="question-text">{question.question}</h2>
        <div className="quiz-info">
          <p>
            Question <span id="current-question">{questionIndex + 1}</span> of{" "}
            <span id="total-questions">{totalQuestions}</span>
          </p>

          <p>
            Score: <span id="score">{score}</span>
          </p>
        </div>
      </div>

      <div id="answers-container" className="answers-container">
        {question.answers.map((answer, index) => {
          // Determine the styling based on whether an answer was clicked
          let btnClass = "answer-btn";
          if (isAnswered) {
            if (answer.correct) {
              btnClass += " correct"; // Always reveal the correct answer
            } else if (index === selectedIndex) {
              btnClass += " incorrect"; // Highlight the wrong answer if the user clicked it
            }
          }

          return (
            <button
              key={index}
              className={btnClass}
              disabled={isAnswered}
              onClick={() => handleAnswerClick(answer.correct, index)}
            >
              {answer.text}
            </button>
          );
        })}
      </div>
      <div className="progress-bar">
        {/* Make sure to add the '%' symbol to the width! */}
        <div
          className="progress"
          id="progress"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </div>
  );
}

export function EndScreen({ score, totalQuestions, onRestart }) {
  // Calculate results message dynamically based on score percentage
  const percentage = (score / totalQuestions) * 100;
  let resultMessage = "Keep studying! You'll get better!";

  if (percentage === 100) {
    resultMessage = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage = "Not bad! Try again to improve!";
  }

  return (
    <div className="screen active" id="result-screen">
      <h1>Quiz Results</h1>
      <div className="results-info">
        <p>
          You scored <span id="final-score">{score}</span> out of{" "}
          <span id="max-score">{totalQuestions}</span>
        </p>
        <div id="result-message" className="results-message">
          {resultMessage}
        </div>
      </div>
      <button id="restart-btn" onClick={onRestart}>
        Restart Quiz
      </button>
    </div>
  );
}

export default function App() {
  // 0 = Start, 1 = Quiz, 2 = Results
  const [screen, setScreen] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const startQuiz = () => {
    setScreen(1);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handleFinishQuiz = () => {
    setScreen(2);
  };

  return (
    <div className="container">
      {/* We use logical && to only render the component that should currently be active */}

      {screen === 0 && <StartScreen onStart={startQuiz} />}

      {screen === 1 && (
        <QuizScreen
          question={quiz[currentQuestionIndex]}
          questionIndex={currentQuestionIndex}
          totalQuestions={quiz.length}
          score={score}
          setScore={setScore}
          onNext={handleNextQuestion}
          onFinish={handleFinishQuiz}
        />
      )}

      {screen === 2 && (
        <EndScreen
          score={score}
          totalQuestions={quiz.length}
          onRestart={startQuiz}
        />
      )}
    </div>
  );
}
