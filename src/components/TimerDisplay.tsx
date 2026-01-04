// TimerDisplayProps インターフェースを定義します。(タイマー表示のプロパティ)
interface TimerDisplayProps {
  minutes: number;
  seconds: number;
}

// TimerDisplay コンポーネントを定義します。(タイマーの表示部分)
// propsとして分(minutes)と秒(seconds)を受け取り、フォーマットして表示します。
export default function TimerDisplay({ minutes, seconds }: TimerDisplayProps) {
  return (
    <div className="text-6xl font-mono font-bold text-primary">
      {/* String(minutes),String(seconds) : 受け取った分と秒を文字列に変換し、2桁にパディング（0を埋める） */}
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
}