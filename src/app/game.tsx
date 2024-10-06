import React, { useEffect, useState } from "react";
import 'tailwindcss/tailwind.css';
import { stationNameList } from "../../stations-name-list";

interface StationRecord {
  correct: number;
  incorrect: number;
}
/**
 * ランダムな駅名を取得する関数
 * @returns ランダムな駅名を返す
 */
const getRandomStation = () => {
  const randomIndex = Math.floor(Math.random() * stationNameList.length);
  return stationNameList[randomIndex];
}

const initialStation = getRandomStation();
console.log('initialStation',initialStation)
const Game: React.FC = () => {
  /**
   * 現在の問題の駅名
   */
  const [currentStation, setCurrentStation] = useState(initialStation);
  console.log('currentStation',currentStation)
  /**
   * 正解数
   */
  const [correctCount, setCorrectCount] = useState<number>(0);
  /**
   * 駅名の読み方の選択肢
   */
  const [options, setOptions] = useState<string[]>([]);
  /**
   * 選択された駅名の読み方
   */
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  /**
   * 確定ボタンを押した時に表示するメッセージ
   */
  const [message, setMessage] = useState<string | null>(null);
  /**
   * 出題済みの駅名
   */
  const [usedStations, setUsedStations] = useState<Set<string>>(new Set([initialStation.stationName]));
  /**
   * 確定ボタンを押したか後、駅名の選択肢を選択できないようにする
   */
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  /**
   * ゲームが終了したかどうか
   */
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  /**
   * ゲーム開始時に初期設定を行う
   */

  const [stationRecords, setStationRecords] = useState<Record<string, StationRecord>>({});


  // useEffect(() => {
  //   const initialStation = getRandomStation();
  //   setCurrentStation(initialStation);
  //   setUsedStations(new Set([initialStation.stationName]));
  //   generateOptions(initialStation);
  // }, []);

  /**
   * 初回レンダリング時に選択肢を生成する
   */
  useEffect(() => {
    generateOptions(currentStation);
  }, [currentStation]);

  /**
   * 現在の駅に対する選択肢を生成する関数
   */
  const generateOptions = (station: typeof currentStation) => {
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

    const isCorrect = selectedOption === currentStation.reading;
    if (isCorrect) {
      setMessage(`正解です！${currentStation.stationName}駅の読み方は「${currentStation.reading}」です。所属路線: ${currentStation.lineName}`);
      setCorrectCount(prev => prev + 1);
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
   * 駅名の正解数を記録する
   */
  const recordAnswer = (stationName: string, isCorrect: boolean) => {
    setStationRecords((prevRecords: Record<string, StationRecord>) => {
      const record = prevRecords[stationName] || { correct: 0, incorrect: 0 };
      if (isCorrect) {
        record.correct += 1;
      } else {
        record.incorrect += 1;
      }
      return { ...prevRecords, [stationName]: record };
  });
  }


  /**
   * 次の問題を表示する
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
  console.log('usedStations',usedStations)

  /**
   * ゲームをリセットする
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
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-2 text-black">各駅名の正解率</h2>
          <ul>
            {Object.entries(stationRecords).map(([stationName, record]) => (
              <li key={stationName} className="text-black">
                {stationName}: 正解 {record.correct} 回, 不正解 {record.incorrect} 回
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  const remainingQuestions = stationNameList.length - usedStations.size;
  console.log('remainingQuestions',remainingQuestions)
  console.log('stationNameList.length',stationNameList.length)
  console.log('usedStations.size',usedStations.size)
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
