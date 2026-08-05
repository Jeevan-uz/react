import { useState } from "react";
import { quiz } from "./data";
// import "./App.css";

export function StartScreen({ screen, setScreen }) {
  return (
    <div
      className="screen active"
      hidden={screen == 0 ? false : true}
      id="start-quiz"
    >
      <h1>Quiz Time</h1>
      <p>Test your knowledge with these fun questions</p>
      <button onClick={() => setScreen(screen + 1)} className="start-btn">
        Start Quiz
      </button>
    </div>
  );
}

export function Screen({
  question,
  score,
  setScore,
  problem,
  setProblem,
  screen,
  setScreen,
  per,
  answerd,
  setAnswerd,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  function right() {}

  return (
    <div
      className="screen"
      hidden={screen == 1 ? false : true}
      id="quiz-screen"
    >
      <div className="quiz-header">
        <h1>{question.questions}</h1>
      </div>

      <div className="quiz-info">
        <p>
          Quetion <span className="current-question">{question.id + 1}</span> of{" "}
          <span className="total-questions">5</span>{" "}
        </p>
        <p>
          Score <span>{score}</span>
        </p>
      </div>

      <div className="answers-container">
        {question.answers.map((answer) => (
          <button
            className={`answer-btn ${answer.text}`}
            key={answer.text}
            disabled={selectedAnswer == 0 ? false : true}

            onClick={() => {
              if (answer.correct) {
                setScore(score + 1);
              }

              if (problem < quiz.length - 1) {
                setTimeout(() => {
                  setAnswerd("");
                  setProblem(problem + 1);
                  setSelectedAnswer(selectedAnswer - 1);
                }, 1000);
              }

              if (problem == quiz.length - 1) setScreen(screen + 1);

              setAnswerd(answer.text);

              setSelectedAnswer(selectedAnswer + 1);
            }}
          >
            {answer.text}
          </button>
        ))}
      </div>

      <div className="progress-bar">
        <div className="progress" style={{ width: per }}></div>
      </div>
    </div>
  );
}

export function EndScreen({
  score,
  screen,
  setScreen,
  setScore,
  problem,
  setProblem,
}) {
  return (
    <div className="screen" hidden={screen == 2 ? false : true}>
      <h1>Quiz Results</h1>
      <div className="results-info">
        <p>
          You Scored <span className="correct">{score}</span> out of{" "}
          <span className="notCorrect">5</span>{" "}
        </p>
        <div id="result-message">Good job</div>
      </div>
      <button
        className="result-btn"
        onClick={(e) => {
          setScreen(screen - screen);
          setScore(score - score);
          setProblem(problem - problem);
          e.preventDefault();
        }}
      >
        Restart Quiz
      </button>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isScore, setScore] = useState(0);

  const [answerd, setAnswerd] = useState("");
  const per = ((currentQuestion + 1) / quiz.length) * 100;

  return (
    <div className="container">
      <StartScreen screen={screen} setScreen={setScreen} />

      <Screen
        question={quiz[currentQuestion]}
        score={isScore}
        setScore={setScore}
        problem={currentQuestion}
        setProblem={setCurrentQuestion}
        screen={screen}
        setScreen={setScreen}
        answerd={answerd}
        setAnswerd={setAnswerd}
        per={per}
      />

      <EndScreen
        score={isScore}
        setScore={setScore}
        problem={currentQuestion}
        setProblem={setCurrentQuestion}
        screen={screen}
        setScreen={setScreen}
      />
    </div>
  );
}
