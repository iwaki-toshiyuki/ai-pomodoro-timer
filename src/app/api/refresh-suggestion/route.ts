import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

// 環境変数からAPIキーを取得
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// GoogleGenAIクライアントを初期化
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function GET() {
// プロンプトを定義
const prompt = `
    # 命令
    作業の合間にできる簡単なリフレッシュ方法を1つ提案してください。

    # 制約事項
    - 1~2分程度でできること
    - 室内でできること
    - 体を動かすこと
    - 絵文字を1つ含めること
    - 簡潔に1文の中に収めること
    - 「〜しよう」のように提案する形で終わること

    # 出力例
    - 大きく背伸びしよう🙆
    - 室内で少し歩こう🚶
`;

// AIモデルを呼び出してコンテンツを生成
const response = await ai.models.generateContent({
    // モデルの調べ方: 「gemini モデル 料金」と検索して、無料枠内で使える軽量モデルを選択
    model: 'gemini-2.5-flash-lite',
    contents: prompt,
});

// レスポンスをJSON形式で返す
return NextResponse.json({ suggestion: response.text }, { status: 200 })
}