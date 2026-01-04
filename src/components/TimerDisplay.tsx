// TimerDisplayProps インターフェースを定義します。(タイマー表示のプロパティ)
interface TimerDisplayProps {
  minutes: number;
  seconds: number;
  mode: 'work' | 'break';
}

// TimerDisplay コンポーネントを定義します。(タイマーの表示部分)
// propsとして分(minutes)と秒(seconds)とmodeを受け取り、フォーマットして表示します。
export default function TimerDisplay({ minutes, seconds, mode }: TimerDisplayProps) {
  return (
    // タイマーの表示部分。mode に応じて色を変更（作業モードは赤、休憩モードは緑）
    <div className={`text-6xl font-mono font-bold
        ${mode === 'work' ? 'text-red-500' : 'text-green-500'}
        `}>
      {/* String(minutes),String(seconds) : 受け取った分と秒を文字列に変換し、2桁にパディング（0を埋める） */}
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
}