import React, { useEffect, useState } from "react";
import { stationNameList } from "../../stations-name-list";

const Game: React.FC = () => {
  const [currentStation, setCurrentStation] = useState(stationNameList[0]);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [usedStations, setUsedStations] = useState<Set<string>>(new Set());
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  /**
   * ゲーム開始時に初期設定を行う
   */
  useEffect(() => {
    generateOptions();
  }, [currentStation]);

  /**
   * 現在の駅に対する選択肢を生成する関数
   */
  const generateOptions = () => {
    const correctAnswer = currentStation.reading;
    const incorrectAnswers = currentStation.wrongReadings || [];
    const allOptions = [correctAnswer, ...incorrectAnswers].sort(
      () => 0.5 - Math.random()
    );
    setOptions(allOptions);
    setSelectedOption(null);
    setMessage(null);
    setIsConfirmed(false);
  };

  /**
   * ユーザーが選択したときに呼び出される関数
   * @param option ユーザーがユーザーがクリックした選択肢
   */
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  /**
   *
   * @returns ユーザーが選択肢を選択していない場合はエラーメッセージを表示し、選択肢を選択している場合は正誤を表示する
   */
  const handleConfirmClick = () => {
    if (selectedOption === null) {
      setMessage("選択肢を選んでください。");
      return;
    }

    /**
     確定ボタンを押したら、選択肢を変更できないようにする
     */
    setIsConfirmed(true);

    /**
     * 選択肢が正解かどうかを判定する
     */
    if (selectedOption === currentStation.reading) {
      setMessage(
        `正解です！${currentStation.stationName}駅の読み方は「${currentStation.reading}」です。所属路線: ${currentStation.lineName}`
      );
      setCorrectCount((prev) => prev + 1);
    } else {
      setMessage(
        `違います。${currentStation.stationName}駅の読み方は「${currentStation.reading}」です。所属路線: ${currentStation.lineName}`
      );
    }

    if (usedStations.size + 1 === stationNameList.length) {
      setIsGameOver(true);
    }
  };

  /**
   * 次の駅に進む関数
   */
  const nextStation = () => {
    let nextIndex;
    let nextStation;
    do {
      nextIndex = Math.floor(Math.random() * stationNameList.length);
      nextStation = stationNameList[nextIndex];
    } while (usedStations.has(nextStation.stationName));

    setUsedStations((prev) => new Set(prev).add(nextStation.stationName));
    setCurrentStation(nextStation);
  };

  /**
   * ゲームをリセットする関数
   */
  const resetGame = () => {
    setCurrentStation(stationNameList[0]);
    setCorrectCount(0);
    setUsedStations(new Set());
    setIsGameOver(false);
  };

  if (isGameOver) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4 text-black">ゲーム終了</h1>
        <p className="text-2xl mb-2 text-black">
          正解数: {correctCount} / {stationNameList.length}
        </p>
        <p className="text-xl mb-4 text-black">お疲れ様でした！</p>
        <button
          onClick={resetGame}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          もう一度プレイする
        </button>
      </div>
    );
  }

  const remainingQuestions = stationNameList.length - usedStations.size;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-black">
        駅名の読み方当てクイズ
      </h1>
      <p className="text-2xl mb-2 text-black">
        残り問題数: {remainingQuestions}
      </p>
      <p className="text-xl mb-4 text-black">{currentStation.stationName}</p>
      <div className="flex flex-col">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            className={`px-4 py-2 rounded mb-2 border-2 ${
              selectedOption === option
                ? "bg-blue-500 text-white border-blue-500"
                : "border-blue-500 text-blue-500"
            }`}
            disabled={isConfirmed}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        onClick={handleConfirmClick}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-700"
      >
        確定
      </button>
      {message && (
        <div className="mt-4 p-4 border rounded bg-white text-black">
          {message}
          <button
            onClick={nextStation}
            className="ml-4 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
          >
            次の問題
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;
