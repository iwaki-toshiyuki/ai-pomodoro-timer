// APIルートを呼び出してリフレッシュ提案を作成
export async function generateRefreshSuggestion(): Promise<string> {
  try {
    // APIを呼び出す
    const response = await fetch('/api/refresh-suggestion')
    const data = await response.json();
    // 提案を返す(ex suggestion: "大きく背伸びしよう🙆")
    return data.suggestion;
  } catch (error) {
    console.error(error);
    return 'エラーが発生しました';
  }
}