import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
 
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});
 
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// メタデータをエクスポートします。(ページのタイトルと説明を設定)
export const metadata: Metadata = {
  title: 'AI Pomodoro Timer',
  description: 'シンプルで使いやすいポモドーロタイマーです。AIが作業効率の向上を提案してくれます。',
};
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // HTMLのlang属性を日本語に設定
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}