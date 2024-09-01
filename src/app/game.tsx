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
    <div>
      <h1>駅名の読み方当てゲーム</h1>
      <p>スコア: {score}</p>
      <p>{currentStation.stationName}</p>
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        placeholder="読み方を入力してください"
      />
      <button onClick={checkAnswer}>答え合わせ</button>
    </div>
  );
};

export default Game;
