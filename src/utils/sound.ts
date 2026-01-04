// 通知音を再生するユーティリティ関数を定義します。
// async：時間がかかる処理（通信・待ち時間など）をawait を使って「結果を待つ」書き方ができるようになる。
export async function playNotificationSound() {

  // エラーハンドリングのためにtry-catch文を使用します。
  try {
    // Audioオブジェクトを作成
    const audio = new Audio('/notification.mp3');

    // 音量を設定
    audio.volume = 0.3;

   // 音声を再生（再生開始できるかを await で確認）
    await audio.play();

    // 音声の再生が完了するまで待機
    // 再生完了時に resolve される Promise を返し、
    // 呼び出し元で await することで再生終了まで待てるようにする
    return new Promise<void>((resolve) => {
      audio.onended = () => {
        resolve();
      };
    });
  } catch (error) {
    console.error('通知音の再生に失敗しました:', error);
  }
}
