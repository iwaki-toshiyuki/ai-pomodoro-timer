import { useEffect } from 'react';

// MetadataUpdater コンポーネントのプロパティの型を定義します。
interface MetadataUpdaterProps {
  minutes: number;
  seconds: number;
  mode: 'work' | 'break';
}

// MetadataUpdater コンポーネントを定義します。(ドキュメントのタイトルを更新)
export default function MetadataUpdater({ minutes, seconds, mode }: MetadataUpdaterProps) {
  useEffect(() => {
    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    const modeString = mode === 'work' ? '作業' : '休憩';
    // タイトルを更新
    document.title = `(${timeString}) ${modeString} - AI Pomodoro Timer`;
  },
  // 依存配列：minutes, seconds, mode が変化するたびに effect を再実行
  [minutes, seconds, mode]);
 
  return null;
}