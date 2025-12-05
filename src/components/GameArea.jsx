import { useState } from "react";
import Swal from "sweetalert2";
import { QUESTIONS } from "../utils/Questions";
import CommunityHub from "./CommunityHub";
import { TOOL_INFO } from "../utils/TOOL_INFO";

export default function GameArea() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [daysLeft, setDaysLeft] = useState(30);
  const [hiddenBudget, setHiddenBudget] = useState(150000);
  const [credibility, setCredibility] = useState(50);
  const [nirdScore, setNirdScore] = useState(0);
  const [chosenTools, setChosenTools] = useState([]); // ← tracks player choices
  const [gameState, setGameState] = useState({ os: null });
  const [isGameOver, setIsGameOver] = useState(false);
  const [showCommunityHub, setShowCommunityHub] = useState(false);

  const q = QUESTIONS[currentQuestion];

  const gameOver = (reason) => {
    setIsGameOver(true);
    Swal.fire({
      icon: "error",
      title: "GAME OVER",
      text: reason,
      background: "#e8e4d0",
      color: "#1a4d2e",
      confirmButtonColor: "#d4a373",
    });
  };

  const winGame = () => {
    setShowCommunityHub(true);
  };

  // Beautiful popup when player picks an open-source tool
  const showToolInfo = (toolName) => {
    const info = TOOL_INFO[toolName];
    if (!info) return;

    Swal.fire({
      title: `Great choice: ${toolName}`,
      html: `
        <p class="text-lg leading-relaxed mb-6">${info.desc}</p>
        <a href="${info.link}" target="_blank" class="inline-block px-6 py- py-3 bg-[#1a4d2e] text-white font-bold rounded-xl hover:bg-[#2a6d42] transition">
          Visit official site
        </a>
      `,
      icon: "success",
      background: "#e8e4d0",
      color: "#1a4d2e",
      confirmButtonText: "Let's go!",
      confirmButtonColor: "#1a4d2e",
      customClass: {
        popup: "rounded-3xl border-8 border-[#8b7b5e]",
      },
    });
  };

  const handleChoice = async (choice) => {
    let timeUsed = choice.timeCost || 0;
    let budgetUsed = choice.budgetCost || 0;
    let points = choice.points || 0;
    let credChange = 0;

    // Safety checks
    if (hiddenBudget - budgetUsed < 0) {
      return gameOver("Budget exceeded — the school board fired you!");
    }
    if (daysLeft - timeUsed < 1) {
      return gameOver("Time ran out! Windows 10 died and the GAFAM won…");
    }

    // Quiz confirmation (when present)
    if (choice.confirm) {
      const result = await Swal.fire({
        title: choice.confirm.question,
        input: "radio",
        inputOptions: {
          correct: choice.confirm.correct,
          wrong: choice.confirm.wrong,
        },
        inputValidator: (value) => !value && "You must choose one!",
        background: "#e8e4d0",
        color: "#1a4d2e",
        confirmButtonColor: "#d4a373",
      });

      if (result.value === "correct") {
        credChange += choice.confirm.correctBoost;
        points += 5;
      } else {
        credChange += choice.confirm.wrongPenalty;
        points -= 5;
      }
    }

    // Special rule: LibreOffice on Linux = bonus
    if (currentQuestion === 1) {
      if (choice.name.includes("LibreOffice")) {
        credChange += gameState.os === "Linux" ? 15 : -20;
      } else {
        credChange += gameState.os === "Windows" ? 10 : -25;
      }
    }

    // Apply changes
    const newCred = Math.max(0, Math.min(100, credibility + credChange));
    const budgetBonus = credChange * 2000;
    const newBudget = Math.min(300000, Math.max(0, hiddenBudget - budgetUsed + budgetBonus));

    setDaysLeft(daysLeft - timeUsed);
    setHiddenBudget(newBudget);
    setCredibility(newCred);
    setNirdScore(nirdScore + points);

    // Remember OS choice
    if (currentQuestion === 0) {
      setGameState({
        os: choice.name.includes("Linux") ? "Linux" : "Windows",
      });
    }

    // If it's an open-source choice → record it + show info popup
    const isOpenSourceChoice = points > 0 || choice.name.includes("Linux");
    if (isOpenSourceChoice) {
      setChosenTools((prev) => [...prev, choice.name]);
      setTimeout(() => showToolInfo(choice.name), 700); // tiny delay = more dramatic
    }

    // Victory or next question
    if (currentQuestion === QUESTIONS.length - 1) {
      winGame();
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // GAME OVER screen
  if (isGameOver) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
        <div className="text-center">
          <h1 className="text-6xl font-black text-red-600 mb-8">GAME OVER</h1>
          <button
            onClick={() => window.location.reload()}
            className="px-20 py-12 bg-[#d4a373] hover:bg-amber-400 text-[#0f5529] font-black text-5xl rounded-3xl border-8 border-[#8b7b5e] shadow-2xl hover:scale-110 transition"
          >
            TRY AGAIN
          </button>
        </div>
      </div>
    );
  }

  // Victory → Community Hub
  if (showCommunityHub) {
    return (
      <CommunityHub
        finalScore={nirdScore}
        daysUsed={30 - daysLeft}
        credibility={credibility}
        budgetLeft={hiddenBudget}
        chosenTools={chosenTools}
      />
    );
  }

  // Normal game screen
  return (
    <div className="max-w-5xl mx-auto py-12">
      <div className="bg-[#e8e4d0] rounded-3xl border-8 border-[#8b7b5e] p-10 md:p-16 shadow-2xl">
        <div className="flex flex-wrap justify-between gap-6 mb-12 text-center">
          <div className="text-5xl font-black text-red-600 animate-pulse">
            {daysLeft} DAYS LEFT
          </div>
          <div className="text-4xl font-bold text-[#d4a373]">
            NIRD: {nirdScore} / 90
          </div>
          <div className="text-2xl text-[#1a4d2e]/80">
            Credibility: {credibility}%
          </div>
        </div>

        <h2 className="text-5xl font-black text-center text-[#1a4d2e] mb-8">
          {q.title}
        </h2>
        <p className="text-xl md:text-2xl text-center text-[#1a4d2e]/90 mb-12 max-w-4xl mx-auto leading-relaxed">
          {q.question}
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {q.choices.map((choice, i) => (
            <button
              key={i}
              onClick={() => handleChoice(choice)}
              className="p-10 bg-[#1a4d2e] hover:bg-[#2a6d42] text-[#e8e4d0] text-2xl md:text-3xl font-bold rounded-3xl border-8 border-[#4a8b6a] shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
            >
              <div className="mb-4">{choice.name}</div>
              <div className="text-lg space-y-1">
                {choice.timeCost > 0 && <div className="text-orange-200">- {choice.timeCost} days</div>}
                {choice.budgetCost > 0 && <div className="text-red-300">- ${choice.budgetCost.toLocaleString()}</div>}
                {choice.points > 0 && <div className="text-yellow-300">+{choice.points} NIRD</div>}
              </div>
            </button>
          ))}
        </div>

        <div className="text-center mt-12 text-[#1a4d2e]/60">
          Question {currentQuestion + 1} / {QUESTIONS.length}
        </div>
      </div>
    </div>
  );
}