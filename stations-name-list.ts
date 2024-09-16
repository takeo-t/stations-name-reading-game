import { read, stat } from "fs";

export const stationNameList = [
  { stationName: "新鹿", reading: "あたしか", lineName: "紀勢本線", location: "三重県熊野市", wrongReadings: ["しんしか", "あらしか", "あしたか"] },
  { stationName: "音威子府", reading: "おといねっぷ", lineName: "宗谷本線", location: "北海道音威子府村", wrongReadings: ["おといねふ", "おんいねっぷ", "おといこぶ"] },
  { stationName: "倶知安", reading: "くっちゃん", lineName: "函館本線", location: "北海道虻田郡倶知安町", wrongReadings: ["ぐちやす", "くちやん", "くっちやん"] },
  { stationName: "古井", reading: "こび", lineName: "高山本線", location: "岐阜県美濃加茂市", wrongReadings: ["ふるい", "こい", "こひ"] },
  { stationName: "温田", reading: "ぬくた", lineName: "飯田線", location: "長野県下伊那郡泰阜村", wrongReadings: ["おんだ", "あたた", "ぬくだ"] },
  { stationName: "祝園", reading: "ほうその", lineName: "片町線", location: "京都府相楽郡精華町", wrongReadings: ["いわいぞの", "いわいぞん", "ほうぞの"] },
  { stationName: "半家", reading: "はげ", lineName: "予土線", location: "高知県四万十市", wrongReadings: ["はんけ", "はんか", "はっけ"] },
  { stationName: "膳所", reading: "ぜぜ", lineName: "東海道本線", location: "滋賀県大津市", wrongReadings: ["ぜんじょ", "ぜせ", "ぜんじょう"] },
  { stationName: "京終", reading: "きょうばて", lineName: "桜井線", location: "奈良県奈良市", wrongReadings: ["きょうしゅう", "きょうおわり", "きょうつい"] },
  { stationName: "万能倉", reading: "まなぐら", lineName: "福塩線", location: "広島県福山市", wrongReadings: ["まのくら", "まんのうぐら", "まぐら"] },
];
