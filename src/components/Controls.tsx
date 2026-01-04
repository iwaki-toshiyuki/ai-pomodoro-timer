import { Button } from "@/components/ui/button";

// ControlsProps インターフェースを定義します。(開始とリセットとモード切り替えのコールバック関数と実行状態を含む)
interface ControlsProps {
  onStart: () => void;
  onReset: () => void;
  onModeToggle: () => void;
  isRunning: boolean;
}

// Controls コンポーネントを定義します。(開始ボタンとリセットボタンを含む)
// propsとして onStart, onReset, isRunning を受け取ります。
export default function Controls({
  onStart,
  onReset,
  onModeToggle,
  isRunning,
}: ControlsProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button variant="default" size="lg" onClick={onStart}>
        {/* isRunning が true の場合は '停止'、false の場合は '開始' を表示 */}
        {isRunning ? "停止" : "開始"}
      </Button>
      <Button variant="secondary" size="lg" onClick={onReset}>
        リセット
      </Button>
      <Button
        variant="ghost"
        onClick={onModeToggle}
        className="text-muted-foreground hover:text-foreground"
      >
        モード切り替え
      </Button>
    </div>
  );
}
