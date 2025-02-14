let currentEndpoint = "";
let currentApiKey = "";
let currentModel = "gpt-3.5-turbo";
let promptSuffix = "";

function saveSettings() {
    currentEndpoint = document.getElementById('endpointInput').value;
    currentApiKey = document.getElementById('apiKeyInput').value;
    currentModel = document.getElementById('modelSelect').value;
    promptSuffix = document.getElementById('promptSuffixInput').value;
    alert("設定が保存されました");
}

async function sendRequest() {
    const prompt = document.getElementById('inputPrompt').value;
    const outputArea = document.getElementById('outputArea');
    const executionResult = document.getElementById('executionResult');
    const previewArea = document.getElementById('previewArea');

    if (!currentEndpoint || !currentApiKey) {
        alert("エンドポイントとAPIキーを保存してください");
        return;
    }

    if (!prompt.trim()) {
        alert("プロンプトを入力してください");
        return;
    }

    // プロンプトにデフォルトの指示を追加
    const modifiedPrompt = `${prompt}\n\n${promptSuffix}`;

    // ローディング状態の表示
    executionResult.textContent = "処理中...";
    outputArea.value = "";
    previewArea.innerHTML = ""; // プレビューエリアをクリア

    try {
        const response = await fetch(currentEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${currentApiKey}`
            },
            body: JSON.stringify({
                messages: [{
                    role: "user",
                    content: modifiedPrompt
                }],
                model: currentModel,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `APIリクエストが失敗しました: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.choices && data.choices[0]?.message?.content) {
            let code = data.choices[0].message.content;
            
            // ```html と ``` を削除
            code = code.replace(/^```html\n?/, '')  // 先頭の```htmlを削除
                      .replace(/```$/, '')          // 末尾の```を削除
                      .replace(/^```\n?/, '')       // 先頭の```を削除（言語指定がない場合）
                      .trim();                      // 前後の空白を削除
            
            outputArea.value = code;
            executionResult.textContent = "実行成功！";

            // 生成されたコードをプレビュー
            updatePreview();
        } else {
            throw new Error("APIレスポンスの形式が不正です");
        }
    } catch (error) {
        executionResult.textContent = "エラーが発生しました";
        alert(`エラー: ${error.message}`);
    }
}

// プレビューを更新する関数を追加
function updatePreview() {
    const outputArea = document.getElementById('outputArea');
    const previewArea = document.getElementById('previewArea');
    const executionResult = document.getElementById('executionResult');
    const code = outputArea.value;

    try {
        // iframeを作成して安全にHTMLを表示
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        previewArea.innerHTML = '';
        previewArea.appendChild(iframe);

        // iframeのドキュメントにHTMLを書き込む
        const iframeDoc = iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(code);
        iframeDoc.close();

        executionResult.textContent = "プレビューを更新しました";
    } catch (executionError) {
        executionResult.textContent = `プレビューエラー: ${executionError.message}`;
        previewArea.innerHTML = `<div class="error">プレビューエラー: ${executionError.message}</div>`;
    }
}

// ページ読み込み時に設定を初期化
window.addEventListener('load', () => {
    const promptSuffixInput = document.getElementById('promptSuffixInput');
    if (!promptSuffixInput.value) {
        promptSuffixInput.value = "余計な記述を含めずHTMLのコードだけを返してください。囲み文字もいりません。必要であればCSSやJavascriptのライブラリもHTMLの中で使ってください。";
    }
    promptSuffix = promptSuffixInput.value;
});