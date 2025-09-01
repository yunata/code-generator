let currentEndpoint = "";
let currentApiKey = "";
let currentModel = "gpt-3.5-turbo";
let promptSuffix = "";
let messageHistory = []; // 会話履歴を保持

function saveSettings() {
    currentEndpoint = document.getElementById('endpointInput').value;
    currentApiKey = document.getElementById('apiKeyInput').value;
    currentModel = document.getElementById('modelSelect').value;
    promptSuffix = document.getElementById('promptSuffixInput').value;
    alert("設定が保存されました");
}

function resetSession() {
    messageHistory = [];
    document.getElementById('inputPrompt').value = '';
    document.getElementById('outputArea').value = '';
    document.getElementById('previewArea').innerHTML = '';
    document.getElementById('executionResult').textContent = 'セッションをリセットしました';
}

function getSelectedLibraries() {
    const libraries = {
        'three.js': document.getElementById('useThreeJs').checked,
        'anime.js': document.getElementById('useAnimeJs').checked,
        'gsap': document.getElementById('useGsap').checked,
        'p5.js': document.getElementById('useP5').checked
    };

    const selectedLibs = Object.entries(libraries)
        .filter(([_, isSelected]) => isSelected)
        .map(([lib]) => lib);

    return selectedLibs;
}

function getLibraryUrls(libraries) {
    const urls = {
        'three.js': [
            'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
        ],
        'anime.js': [
            'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js'
        ],
        'gsap': [
            'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js'
        ],
        'p5.js': [
            'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js'
        ]
    };

    return libraries.flatMap(lib => urls[lib] || []);
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

    // 現在のコードをコンテキストとして含める
    const currentCode = outputArea.value;
      const selectedLibraries = getSelectedLibraries();
      const libraryInfo = selectedLibraries.length > 0
          ? `利用可能なライブラリ: ${selectedLibraries.join(', ')}`
          : '';
      const libraryInfoLine = libraryInfo ? `\n${libraryInfo}` : '';

      let contextPrompt = prompt;
      if (currentCode) {
          contextPrompt = `現在のコード:\n\`\`\`html\n${currentCode}\n\`\`\`\n\n指示:\n${prompt}${libraryInfoLine}\n\n${promptSuffix}`;
      } else {
          contextPrompt = `${prompt}${libraryInfoLine}\n\n${promptSuffix}`;
      }

    // デバッグ用：プロンプトの内容を確認
    console.log('送信するプロンプト:', contextPrompt);
    console.log('promptSuffix:', promptSuffix);

    // メッセージ履歴を作成
    const messages = [
        ...messageHistory,
        { role: "user", content: contextPrompt }
    ];

    // デバッグ用：メッセージ履歴を確認
    console.log('メッセージ履歴:', messages);

    // ローディング状態の表示
    executionResult.textContent = "処理中...";

    try {
        const response = await fetch(currentEndpoint, {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${currentApiKey}`
            },
            body: JSON.stringify({
                messages: messages,
                model: currentModel,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `APIリクエストが失敗しました: ${response.status}`);
        }

        const data = await response.json();
        
        // デバッグ用：APIレスポンスを確認
        console.log('APIレスポンス:', data);
        
        if (data.choices && data.choices[0]?.message?.content) {
            let code = data.choices[0].message.content;
            
            // デバッグ用：コード処理前後の内容を確認
            console.log('処理前のコード:', code);
            
            // ```html と ``` を削除
            code = code.replace(/^```html\n?/, '')
                      .replace(/```$/, '')
                      .replace(/^```\n?/, '')
                      .trim();
            
            console.log('処理後のコード:', code);
            
            outputArea.value = code;
            executionResult.textContent = "実行成功！";

            // 会話履歴を更新
            messageHistory.push(
                { role: "user", content: contextPrompt },
                { role: "assistant", content: data.choices[0].message.content }
            );

            // プレビューを更新
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
    const selectedLibraries = getSelectedLibraries();
    const libraryUrls = getLibraryUrls(selectedLibraries);

    try {
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        previewArea.innerHTML = '';
        previewArea.appendChild(iframe);

        const iframeDoc = iframe.contentWindow.document;
        iframeDoc.open();
        
        // ライブラリを読み込んでからコードを実行
        const libraryScripts = libraryUrls.map(url => `<script src="${url}"></script>`).join('\n');
        iframeDoc.write(`
            <!DOCTYPE html>
            <html>
            <head>
                ${libraryScripts}
            </head>
            <body>
                ${code}
            </body>
            </html>
        `);
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
        promptSuffixInput.value = "余計な記述を含めずHTMLのコードだけを返してください。囲み文字もいりません。必要なJavaScriptライブラリは自動的に含めます。";
    }
    // デバッグ用：初期化時のpromptSuffixを確認
    promptSuffix = promptSuffixInput.value;
    console.log('初期化時のpromptSuffix:', promptSuffix);
});

// Export functions for testing environments
if (typeof module !== 'undefined') {
    module.exports = { getSelectedLibraries, getLibraryUrls };
}