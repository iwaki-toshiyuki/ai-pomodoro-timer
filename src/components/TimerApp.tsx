// use client directiveを追加して、クライアントサイドでのレンダリングを指定します。
"use client";

// 必要なコンポーネントをインポートします。
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Switch } from '@/components/ui/switch';
import Controls from "./Controls";
import MetadataUpdater from "./MetadataUpdater";
import RefreshSuggestion from './RefreshSuggestion';
import TimerDisplay from "./TimerDisplay";
import { useState, useEffect } from "react";
import { useReward } from 'react-rewards';
import { playNotificationSound } from '@/utils/sound';
import { generateRefreshSuggestion } from '@/utils/gemini';

// タイマーのモードを表す型(作業モードと休憩モード)を定義します。
// ユニオン型を使用して 'work' または 'break' のいずれかの文字列を取ることができます。
type Mode = "work" | "break";

// TimerApp コンポーネントを定義します。(Card コンポーネントを使用してタイマーアプリのUIを構築)
export default function TimerApp() {

  // 紙吹雪アニメーションの設定(isAnimatingは今回は使用しない)
  const { reward: confetti } = useReward('confettiReward', 'confetti', {
      elementCount: 100,
      spread: 70,
      decay: 0.93,
      lifetime: 150,
    });

  // タイマーの実行状態を管理するstate
  const [isRunning, setIsRunning] = useState(false);

  // 作業時間・休憩時間を管理する状態変数
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  // タイマーの残り時間を保持する状態変数
  const [timeLeft, setTimeLeft] = useState({ minutes: workDuration, seconds: 0 });

  // モードの状態を管理する変数
  const [mode, setMode] = useState<Mode>("work");

  // 自動開始の設定
  const [autoStart, setAutoStart] = useState(false);

  // リフレッシュ提案
  const [refreshSuggestion, setRefreshSuggestion] = useState<string | null>(null);

  // モードを切り替える関数
  const toggleMode = () => {
    // 現在のモードを反対のモードに切り替える
    const newMode = mode === "work" ? "break" : "work";
    setMode(newMode);

    // モードに応じてタイマーの時間をリセット
    // 作業モードなら25分、休憩モードなら5分
    setTimeLeft({
      minutes: newMode === "work" ? workDuration : breakDuration,
      seconds: 0,
    });

    // 休憩モードに切り替わった場合にリフレッシュ提案を生成
    if (newMode === 'break') {
      generateRefreshSuggestion()
        .then((suggestion) => setRefreshSuggestion(suggestion))
        .catch(console.error);
    }


    // 自動開始がONの場合は次のセッションを自動的に開始
    setIsRunning(autoStart);
  };

  // 開始/停止ボタンのハンドラ
  const handleStart = () => {
    setIsRunning(!isRunning);
  };

  // リセットボタンのハンドラ
  const handleReset = () => {
    setIsRunning(false);
    // モードに応じてタイマーの時間をリセット
    setTimeLeft({
        minutes: mode === 'work' ? workDuration : breakDuration,
        seconds: 0
    });
  };

  useEffect(() => {
    // setIntervalの戻り値（タイマーID）を保持する変数
    let intervalId: NodeJS.Timeout;

    // タイマーが実行中の場合のみ処理を行う
    if (isRunning) {
      // 1秒（1000ミリ秒）ごとに実行される処理を設定しつつ、
      // 戻り値（タイマーID）を intervalId 変数に再セット
      intervalId = setInterval(() => {
        setTimeLeft((prev) => {
          // 秒数が0の場合
          if (prev.seconds === 0) {
            // 分数が0の場合（タイマー終了）
            if (prev.minutes === 0) {
              setIsRunning(false); // タイマーを停止
              //作業時間のみ紙吹雪アニメーションを実行
              if (mode === 'work') {
                void confetti();
              }
              void playNotificationSound(); // 通知音を再生

              // 少し遅延させてからモード切り替えと自動開始を実行
              setTimeout(() => {
                toggleMode(); // モードを自動切り替え
              }, 100);

              return prev; // 現在の状態（0分0秒）を返す
            }
            // 分数がまだ残っている場合は、分を1減らして秒を59にセット
            return { minutes: prev.minutes - 1, seconds: 59 };
          }
          // 秒数が1以上の場合は、秒を1減らす
          return { ...prev, seconds: prev.seconds - 1 };
        });
      }, 1000); // 1000ミリ秒（1秒）ごとに実行
    }

    // クリーンアップ関数（コンポーネントのアンマウント時やisRunningが変わる前に実行される）
    return () => {
      // ブラウザのタイマーが設定されている場合は、それをクリアする
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]); // isRunningが変わったときだけこのエフェクトを再実行

  // // ================== 動作確認用ここから ==================
  // useEffect(() => {
  //   const testGemini = async () => {
  //     const suggestion = await generateRefreshSuggestion();
  //     console.log(suggestion);
  //   }
  //   testGemini();
  // }, []);
  // // ================== 動作確認用ここまで ==================


  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative bg-gradient-to-br from-sky-100 via-cyan-100 to-blue-100">
      {/* 👇 ここを追加 */}
      <div className="flex flex-col items-center gap-6 text-blue-500">

        {/* タイトル（画像の上に出したい部分） */}
        <h1 className="text-5xl font-bold tracking-tight text-blue-500">
          Next AI Pomodoro Timer
        </h1>
      <span
        id="confettiReward"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold  text-center">
            {mode === "work" ? "作業時間" : "休憩時間"}
          </CardTitle>
        </CardHeader>
        {/* TimerDisplay コンポーネントを CardContent 内に配置してタイマーを表示 */}
        <CardContent className="flex flex-col items-center gap-6">
          <TimerDisplay
            // 初期値として timeLeft の minutes と secondsと mode を渡す
            minutes={timeLeft.minutes}
            seconds={timeLeft.seconds}
            mode={mode}
          />
          {/* Controls コンポーネントを表示 */}
          <Controls
            onStart={handleStart}
            onReset={handleReset}
            onModeToggle={toggleMode}
            isRunning={isRunning}
          />
        </CardContent>
        <CardFooter className="flex flex-col gap-4 w-full max-w-[200px] mx-auto">
          {/* 作業時間の設定 */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium min-w-[4.5rem]">作業時間</label>
            <select
              value={workDuration}
              // 変更時に作業時間を更新し、現在のモードが作業中でタイマーが停止している場合は timeLeft も更新
              onChange={(e) => {
                const newDuration = parseInt(e.target.value);
                setWorkDuration(newDuration);
                if (mode === 'work' && !isRunning) {
                  setTimeLeft({ minutes: newDuration, seconds: 0 });
                }
              }}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2
              focus:ring-blue-500 cursor-pointer"
            >
              {/* 作業時間のオプションを生成 */}
              {[5, 10, 15, 25, 30, 45, 60].map((minutes) => (
                <option
                  key={minutes}
                  value={minutes}
                >
                  {minutes}分
                </option>
              ))}
            </select>
          </div>
          {/* 休憩時間の設定 */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium min-w-[4.5rem]">休憩時間</label>
            <select
              value={breakDuration}
              // 変更時に休憩時間を更新し、現在のモードが休憩中でタイマーが停止している場合は timeLeft も更新
              onChange={(e) => {
                const newDuration = parseInt(e.target.value);
                setBreakDuration(newDuration);
                if (mode === 'break' && !isRunning) {
                  setTimeLeft({ minutes: newDuration, seconds: 0 });
                }
              }}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2
              focus:ring-blue-500 cursor-pointer"
            >
              {/* 休憩時間のオプションを生成 */}
              {[5, 10, 15].map((minutes) => (
                <option
                  key={minutes}
                  value={minutes}
                >
                  {minutes}分
                </option>
              ))}
            </select>
          </div>

         {/* 自動開始の設定 */}
          <div className="flex items-center gap-2 w-full justify-between">
            <label className="text-sm font-medium min-w-[4.5rem]">自動開始</label>
              <Switch
                checked={autoStart}
                onCheckedChange={() => setAutoStart(!autoStart)}
                className="cursor-pointer"
              />
          </div>

        </CardFooter>
      </Card>
      </div>
        {/* MetadataUpdater コンポーネントを追加してドキュメントのタイトルを更新 */}
      <MetadataUpdater
        minutes={timeLeft.minutes}
        seconds={timeLeft.seconds}
        mode={mode}
      />

      {/* リフレッシュ提案コンポーネントを表示 */}
      <RefreshSuggestion
        suggestion={refreshSuggestion}
        onClose={() => setRefreshSuggestion(null)}
      />
    </div>
  );
}
