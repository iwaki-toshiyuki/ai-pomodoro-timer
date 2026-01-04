import { Button } from '@/components/ui/button';

// ControlsProps インターフェースを定義します。(開始とリセットのコールバック関数と実行状態を含む)
interface ControlsProps {
  onStart: () => void;
  onReset: () => void;
  isRunning: boolean;
}

// Controls コンポーネントを定義します。(開始ボタンとリセットボタンを含む)
// propsとして onStart, onReset, isRunning を受け取ります。
export default function Controls({ onStart, onReset, isRunning }: ControlsProps) {
  return (
    <div className="flex gap-4">
      <Button variant="default" size="lg" onClick={onStart}>
        {/* isRunning が true の場合は '停止'、false の場合は '開始' を表示 */}
        { isRunning ? '停止' : '開始' }
      </Button>
      <Button variant="secondary" size="lg" onClick={onReset}>リセット</Button>
    </div>
  );
}