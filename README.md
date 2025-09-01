# JavaScript Code Generator / JavaScriptコードジェネレーター

An application that generates HTML/JavaScript code using ChatGPT API, with support for various animation libraries.
ChatGPT APIを使用してHTML/JavaScriptコードを生成し、様々なアニメーションライブラリをサポートするアプリケーション。

## Features / 機能

- HTML code generation using ChatGPT API / ChatGPT APIによるHTMLコード生成
- Real-time preview / リアルタイムプレビュー
- Code editing capability / コード編集機能
- Support for multiple GPT models / 複数のGPTモデルに対応
- Animation library integration / アニメーションライブラリの統合
  - Three.js (3D animation / 3Dアニメーション)
  - Anime.js (Advanced 2D animation / 高度な2Dアニメーション)
  - GSAP (Professional animation / プロフェッショナルアニメーション)
  - P5.js (Creative coding / クリエイティブコーディング)
- Conversation history management / 会話履歴の管理
- Session reset function / セッションリセット機能

## Setup / セットアップ

1. Clone the repository / リポジトリをクローン

2. Open index.html in your browser / ブラウザでindex.htmlを開く

3. Configure the LLM settings / LLM設定を構成
   - Enter endpoint URL / エンドポイントURLを入力
   - Enter API key / APIキーを入力
   - Select model / モデルを選択
   - Choose animation libraries / アニメーションライブラリを選択

## Usage / 使用方法

1. Configure LLM Settings / LLM設定を行う
   - Set endpoint and API key / エンドポイントとAPIキーを設定
   - Select desired GPT model / 使用したいGPTモデルを選択
   - Choose required animation libraries / 必要なアニメーションライブラリを選択

2. Enter Prompt / プロンプトを入力
   - Write your request for HTML code generation / HTMLコード生成のリクエストを記述

3. Generate Code / コードを生成
   - Click "Execute" button / 「実行」ボタンをクリック
   - Generated code will appear in the output area / 生成されたコードが出力エリアに表示

4. Preview and Edit / プレビューと編集
   - View the result in the preview area / プレビューエリアで結果を確認
   - Edit the code if needed / 必要に応じてコードを編集
   - Click "Update Preview" to see changes / 「プレビュー更新」で変更を確認

5. Session Management / セッション管理
   - Use "Reset" button to start a new session / 「リセット」ボタンで新規セッションを開始
   - Previous conversation context is maintained until reset / リセットまで前の会話コンテキストを維持

## Supported Models / 対応モデル

- GPT-3.5 Turbo
- GPT-4
- GPT-4 Turbo
- GPT-4 Mini

## Animation Libraries / アニメーションライブラリ

- Three.js (v128)
- Anime.js (v3.2.1)
- GSAP (v3.9.1)
- P5.js (v1.4.0)

## Notes / 注意事項

- API key is required for operation / 動作にはAPIキーが必要です
- Keep your API key secure / APIキーは安全に管理してください
- Some features may require specific GPT models / 一部機能は特定のGPTモデルが必要な場合があります

## License / ライセンス

MIT License

