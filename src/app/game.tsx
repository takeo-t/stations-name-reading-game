// components/Game.tsx
import React, { useState } from "react";
import { stationNameList } from "../../stations-name-list";

const Game: React.FC = () => {
  const [currentStation, setCurrentStation] = useState(stationNameList[0]);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const checkAnswer = () => {
    if (userInput === currentStation.reading) {
      alert("正解です！");
      setScore(score + 1);
      nextStaion();
    } else {
      alert("違います。もう一度試してください。");
    }
    setUserInput("");
  };

  const nextStaion = () => {
    const nextIndex = Math.floor(Math.random() * stationNameList.length);
    setCurrentStation(stationNameList[nextIndex]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-black">駅名の読み方当てゲーム</h1>
      <p className="text-2xl mb-2 text-black">スコア: {score}</p>
      <p className="text-xl mb-4 text-black">{currentStation.stationName}</p>
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        placeholder="読み方を入力してください"
        className="p-2 border border-gray-300 rounded mb-4 text-black"
      />
      <button
        onClick={checkAnswer}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        答え合わせ
      </button>
    </div>
  );
};

export default Game;
