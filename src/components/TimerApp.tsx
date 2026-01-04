// use client directiveを追加して、クライアントサイドでのレンダリングを指定します。
'use client';

// 必要なコンポーネントをインポートします。
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Controls from './Controls';
import TimerDisplay from './TimerDisplay';
import { useState } from 'react';

// TimerApp コンポーネントを定義します。(Card コンポーネントを使用してタイマーアプリのUIを構築)
export default function TimerApp() {
  // タイマーの実行状態を管理するstate
  const [isRunning, setIsRunning] = useState(false);
 
  // 開始/停止ボタンのハンドラ
  const handleStart = () => {
    setIsRunning(!isRunning);
  };
 
  // リセットボタンのハンドラ
  const handleReset = () => {
    setIsRunning(false);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold  text-center">作業時間</CardTitle>
        </CardHeader>
        {/* TimerDisplay コンポーネントを CardContent 内に配置してタイマーを表示 */}
        <CardContent className="flex flex-col items-center gap-6">
          <TimerDisplay
            // 初期値として25分0秒を設定
            minutes={25}
            seconds={0}
          />
           {/* Controls コンポーネントを表示 */}
         <Controls
            onStart={handleStart}
            onReset={handleReset}
            isRunning={isRunning}
          />
        </CardContent>
      </Card>
    </div>
  );
}