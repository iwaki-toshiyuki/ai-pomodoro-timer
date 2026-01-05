import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Timer } from "lucide-react";

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
    <div className="flex flex-col items-center gap-4 w-full max-w-xs">
      <Button
        variant="default"
        size="lg"
        onClick={onStart}
        // ボタンのスタイルを条件付きで変更
        className={`
            w-full transition-all duration-200 cursor-pointer ${
              isRunning
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-green-700 hover:bg-green-800"
            }`}
      >
        <span className="flex items-center gap-2 font-bold">
          {/* isRunning が true の場合は Pause アイコン、false の場合は Play アイコンを表示 */}
          {isRunning ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}

          {/* isRunning が true の場合は '停止'、false の場合は '開始' を表示 */}
          {isRunning ? "停止" : "開始"}
        </span>
      </Button>
      <div className="flex gap-3 w-full">
          <Button
            variant="secondary"
            size="lg"
            onClick={onReset}
            className="flex-1 group bg-gray-100 hover:bg-gray-200 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              {/* リセットアイコンを追加 */}
              <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
              リセット
            </span>
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={onModeToggle}
            className="flex-1 group bg-gray-100 hover:bg-gray-200 cursor-pointer"
          >
            <span className="flex items-center gap-2">
                {/* タイマーアイコンを追加 */}
                <Timer className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                モード切替
            </span>
          </Button>
        </div>
      </div>
    );
  }
