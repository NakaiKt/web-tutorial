import { Typography, Alert, Box } from "@mui/material";
import BulletPoints from "@/components/parts/BulletPoints";
import Space from "@/components/parts/Space";
import Link from "@/components/parts/Link";
import CodeBlock from "@/components/parts/CodeBlock";

const Dom = () => {
  const domElements = [
    "Document: HTMLドキュメント全体を表すオブジェクト",
    "Element: HTMLタグ（div, p, buttonなど）を表すオブジェクト",
    "Attribute: HTML属性（id, class, srcなど）を表すオブジェクト",
    "Text: テキストノードを表すオブジェクト",
    "Event: ユーザーの操作やブラウザの動作を表すオブジェクト",
  ];

  const domMethods = [
    "要素の取得: getElementById(), querySelector(), querySelectorAll()",
    "要素の作成: createElement(), createTextNode()",
    "要素の操作: appendChild(), removeChild(), replaceChild()",
    "属性の操作: getAttribute(), setAttribute(), removeAttribute()",
    "スタイルの操作: style.property, classList.add/remove/toggle()",
    "イベントの処理: addEventListener(), removeEventListener()",
  ];

  const modernAlternatives = [
    "React: 仮想DOMによる効率的な更新とコンポーネントベースの開発",
    "Vue.js: リアクティブなデータバインディングと直感的なテンプレート",
    "Angular: 双方向データバインディングと包括的なフレームワーク",
    "Svelte: コンパイル時最適化によるパフォーマンス向上",
  ];
  return (
    <div>
      <Typography variant="h2" id="what-is-dom">
        DOMとは何か？
      </Typography>
      <Typography>
        DOM（Document Object Model）は、
        <strong>
          HTMLドキュメントをJavaScriptから操作するためのプログラミングインターフェース
        </strong>
        。
        <br />
        <br />
        <strong>📝 わかりやすく例えると：</strong>
        <br />• <strong>HTMLファイル</strong> = 建物の設計図（静的なテキスト）
        <br />• <strong>DOM</strong> =
        実際に建てられた建物（プログラムで操作可能なオブジェクト）
        <br />• <strong>JavaScript</strong> = 建物を改装・改築する作業員
      </Typography>{" "}
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "grey.800" : "grey.100",
          p: 3,
          my: 3,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          HTMLからDOMへの変換プロセス
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "grey.700" : "grey.200",
              p: 2,
              borderRadius: 1,
              width: "fit-content",
            }}
          >
            📄 HTML (設計図)
          </Typography>
          <Typography variant="h6" color="primary">
            ↓ ブラウザが解析 ↓
          </Typography>
          <Typography
            variant="h6"
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "grey.700" : "grey.200",
              p: 2,
              borderRadius: 1,
              width: "fit-content",
            }}
          >
            🏠 DOM (実際の建物)
          </Typography>
        </Box>
        <Typography>
          <strong>HTML:</strong> 静的なテキストファイル
          <br />
          ↓ ブラウザが読み込み・変換 ↓
          <br />
          <strong>DOM:</strong> JavaScriptで操作可能なオブジェクト群
        </Typography>
      </Box>
      <Space />
      <Typography variant="h3" id="devtools-inspector">
        開発者ツールの「インスペクター」で見れる
      </Typography>
      <Alert severity="success" sx={{ my: 2 }}>
        <Typography>
          <strong>🎯 実は普段使っている機能：</strong>
          <br />
          ブラウザで「F12キー →
          Elements(インスペクター)タブ」で見ているもの、それが
          <strong>DOM</strong>です！
          <br />
          まずはこの身近な例から、DOMの正体を理解しましょう。
        </Typography>
      </Alert>{" "}
      <Typography>
        ブラウザの開発者ツール（F12キー）で「Elements」または「インスペクター」タブを開くと、
        <br />
        そこに表示されているのは
        <strong>HTMLファイルではなく、DOM（Document Object Model）</strong>。
      </Typography>
      <Space />
      <Typography variant="h4" id="devtools-actions">
        普段やっている操作 = DOM操作
      </Typography>
      <BulletPoints
        items={[
          "<strong>要素を右クリック → 「削除」</strong> = element.remove() と同じ",
          "<strong>要素をダブルクリックしてテキスト編集</strong> = element.textContent = '新しいテキスト' と同じ",
          "<strong>Stylesパネルでスタイル変更</strong> = element.style.color = 'red' と同じ",
          "<strong>要素を展開して子要素を確認</strong> = element.children で子要素を取得するのと同じ",
        ]}
      />
      <Space />
      {/* 3. なぜDOMが必要なのか */}
      <Typography variant="h2" id="why-dom-needed">
        なぜDOMが必要なのか？
      </Typography>
      <Typography>
        もしDOMが存在しなかったら、以下のような問題が発生します：
      </Typography>
      <BulletPoints
        items={[
          "HTMLは単なるテキスト → JavaScriptから要素を特定・操作できない",
          "ブラウザごとに異なる実装 → 統一された操作方法がない",
          "イベント処理の仕組みがない → ユーザー操作に応答できない",
          "階層構造を理解できない → 要素の親子関係が分からない",
        ]}
      />{" "}
      <Typography>
        DOMは、これらの問題を解決する
        <strong>標準化されたインターフェース</strong>を提供。
      </Typography>
      <Space />
      {/* 4. 重要な理解：ユーザーが見ているもの */}
      <Typography variant="h2" id="what-user-sees">
        重要：ユーザーが実際に見ているのはDOM
      </Typography>
      <Alert severity="warning" sx={{ my: 2 }}>
        <Typography>
          <strong>🔑 核心的な理解：</strong>
          <br />
          <strong>
            ユーザーがブラウザで見ているのは、HTMLファイルそのものではなく、DOMです！
          </strong>
        </Typography>
      </Alert>
      <Typography variant="h3" id="html-vs-dom-process">
        📋 ブラウザでWebページを表示する流れ
      </Typography>
      <BulletPoints
        items={[
          "<strong>1. HTMLファイルの読み込み</strong>：サーバーから静的なHTMLテキストをダウンロード",
          "<strong>2. パース（解析）</strong>：ブラウザがHTMLテキストを解析してDOMツリーを構築",
          "<strong>3. レンダリング</strong>：DOMツリーを基に、実際の画面表示を生成",
          "<strong>4. ユーザー表示</strong>：ユーザーが見るのはこのレンダリング結果（＝DOM由来）",
        ]}
        style="number"
      />
      <Typography variant="h4" id="devtools-vs-html">
        開発者ツールで見るもの vs 元のHTMLファイル
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 2,
          my: 2,
        }}
      >
        <Box
          sx={{
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "grey.800" : "grey.100",
            p: 2,
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            📁 元のHTMLファイル
          </Typography>
          <Typography variant="body2">
            • サーバーに保存されている
            <br />
            • 静的なテキスト
            <br />
            • 変更されない
            <br />• ソースコード表示で見れる
          </Typography>
        </Box>
        <Box
          sx={{
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "grey.800" : "grey.100",
            p: 2,
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            🏗️ 開発者ツールのDOM
          </Typography>
          <Typography variant="body2">
            • ブラウザのメモリ上
            <br />
            • 動的なオブジェクト
            <br />
            • リアルタイムで変化
            <br />• インスペクターで見れる
          </Typography>
        </Box>
      </Box>
      <Space />
      {/* 5. DOMの構造 */}
      <Typography variant="h2" id="dom-structure">
        DOMの構造：ツリー形式
      </Typography>{" "}
      <Typography>
        DOMは、HTMLドキュメントを階層的なツリー構造として表現。
        <br />
        各HTML要素がNodeオブジェクトとして表現され、親子関係を保持。
      </Typography>
      <CodeBlock
        code={`<!-- 元のHTML -->
<html>
  <head>
    <title>ページタイトル</title>
  </head>
  <body>
    <div id="container">
      <p class="text">Hello World!</p>
      <button>クリック</button>
    </div>
  </body>
</html>`}
        language="html"
      />{" "}
      <Typography>上記のHTMLは、以下のようなDOMツリーとして表現：</Typography>
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "grey.800" : "grey.100",
          p: 2,
          my: 2,
          borderRadius: 1,
        }}
      >
        <Typography
          component="pre"
          sx={{ fontFamily: "monospace", fontSize: "0.9rem" }}
        >
          {`Document
├── html (Element)
    ├── head (Element)
    │   └── title (Element)
    │       └── "ページタイトル" (Text)
    └── body (Element)
        └── div#container (Element)
            ├── p.text (Element)
            │   └── "Hello World!" (Text)
            └── button (Element)
                └── "クリック" (Text)`}
        </Typography>
      </Box>
      <Space />
      <Typography variant="h3" id="dom-objects">
        主要なDOMオブジェクト
      </Typography>{" "}
      <Typography>DOMは以下のような主要なオブジェクトで構成：</Typography>
      <BulletPoints items={domElements} />
      <Space /> {/* 6. DOM操作の基本概念 */}
      <Typography variant="h2" id="dom-operations">
        DOM操作の基本概念
      </Typography>
      <Alert severity="warning" sx={{ my: 2 }}>
        {" "}
        <Typography>
          <strong>⚠️ 重要な前提：</strong>
          <br />
          現代のWeb開発（React、Next.js、Vue.jsなど）では、
          <strong>直接的なDOM操作はほとんど行わない</strong>。
          <br />
          ここでは理解のために基本概念を説明するが、実際の開発では
          <strong>フレームワークが自動的に処理</strong>。
        </Typography>
      </Alert>
      <Typography>DOMを使った基本的な操作の概念：</Typography>
      <BulletPoints items={domMethods} />
      <Typography variant="h3" id="raw-dom-example">
        参考：生のDOM操作の簡単な例
      </Typography>{" "}
      <Typography>
        理解のため、生のJavaScriptでのDOM操作の基本例を提示（
        <strong>実際の開発では使用しない</strong>）：
      </Typography>
      <CodeBlock
        code={`// 要素の取得と操作（参考例：実際は React で行う）
const button = document.querySelector('button');
button.textContent = '新しいテキスト';
button.addEventListener('click', () => {
  console.log('クリックされました');
});

// 要素の作成と追加（参考例：実際は React で行う）
const newDiv = document.createElement('div');
newDiv.textContent = '動的な要素';
document.body.appendChild(newDiv);`}
        language="javascript"
      />
      <Space />
      <Typography variant="h2" id="modern-approach">
        モダンなアプローチ：React/Next.jsでのDOM操作
      </Typography>
      <Alert severity="success" sx={{ my: 2 }}>
        <Typography>
          <strong>✨ 現代の開発では：</strong>
          <br />
          React/Next.js、Vue.js、Angularなどのフレームワークが
          <strong>DOM操作を自動化</strong>。
          <br />
          開発者は「どう表示したいか」を宣言するだけで、フレームワークが効率的にDOMを更新。
        </Typography>
      </Alert>{" "}
      <Typography variant="h3" id="react-vs-vanilla">
        比較：生のDOM操作 vs React
      </Typography>
      <Typography>同じ機能を実装する場合の違い：</Typography>
      <Typography variant="h6" sx={{ mt: 3, mb: 2, color: "warning.main" }}>
        ❌ 生のDOM操作（現在は使わない）
      </Typography>
      <CodeBlock
        code={`// 複雑で保守性が低い
const button = document.querySelector('#myButton');
const counter = document.querySelector('#counter');
let count = 0;

button.addEventListener('click', () => {
  count++;
  counter.textContent = count; // 手動でDOM更新
  
  // 条件に応じてスタイル変更
  if (count >= 10) {
    counter.style.color = 'red';
  } else {
    counter.style.color = 'black';
  }
});`}
        language="javascript"
      />
      <Typography variant="h6" sx={{ mt: 3, mb: 2, color: "success.main" }}>
        ✅ Reactでの実装（モダンなアプローチ）
      </Typography>
      <CodeBlock
        code={`// シンプルで宣言的
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        クリック
      </button>
      <p style={{ color: count >= 10 ? 'red' : 'black' }}>
        {count}
      </p>
    </div>
  );
} // React が自動的にDOM更新`}
        language="tsx"
      />
      <Typography variant="h4" id="react-benefits">
        Reactアプローチの利点
      </Typography>
      <BulletPoints
        items={[
          "<strong>宣言的</strong>：「どう表示したいか」を記述するだけ（DOM操作は自動）",
          "<strong>状態管理</strong>：useState で状態変化を簡潔に管理",
          "<strong>自動更新</strong>：状態が変わると自動的にUIが更新される",
          "<strong>パフォーマンス</strong>：仮想DOMにより効率的な更新",
          "<strong>保守性</strong>：コードが読みやすく、バグが少ない",
        ]}
      />
      <Space /> {/* 実験してみよう（簡潔版） */}
      <Typography variant="h2" id="devtools-demo">
        💡 簡単な実験：DOMの変化をリアルタイムで確認
      </Typography>
      <Alert severity="info" sx={{ my: 2 }}>
        <Typography>
          <strong>💡 具体的な手順：</strong>
          <br />
          1. <strong>F12キー</strong>を押して開発者ツールを開く
          <br />
          2. <strong>「Elements」タブ</strong>（Chrome）または
          <strong>「インスペクター」タブ</strong>（Firefox）を開く
          <br />
          3. <strong>「Console」タブ</strong>
          をクリック（開発者ツール内の別タブ）
          <br />
          4. 下記のJavaScriptコードをコピペして<strong>Enterキー</strong>で実行
          <br />
          5. すぐに<strong>「Elements」タブに戻る</strong>→
          DOMツリーに新しい要素が追加されているのを確認
          <br />
          6. 3秒後に要素が自動削除されるのも確認できる
        </Typography>
      </Alert>
      <CodeBlock
        code={`
  // 開発者ツールのConsoleタブで実行（学習目的）
  const newElement = document.createElement('div');
  newElement.textContent = '🎉 実験成功！この要素がDOMに追加されました';
  newElement.style.backgroundColor = 'lightgreen';
  newElement.style.color = 'white';
  newElement.style.padding = '20px';
  newElement.style.margin = '10px';
  newElement.style.borderRadius = '8px';
  newElement.style.fontWeight = 'bold';
  document.body.appendChild(newElement);

  console.log('要素を追加しました！画面の一番下に表示されています');

  // 20秒後に削除
  setTimeout(() => {
    newElement.remove();
    console.log('要素を削除しました');
  }, 20000);`}
        language="javascript"
      />
      <Alert severity="success" sx={{ my: 2 }}>
        <Typography>
          <strong>✅ 成功すると：</strong>
          <br />
          • ページ上に緑色のボックスが表示される
          <br />
          • Elementsタブで新しい&lt;div&gt;要素が追加されているのが見える
          <br />
          • 20秒後に要素が消えて、DOMツリーからも削除される
          <br />
          • Consoleにメッセージが表示される
          <br />
          <br /> <strong>これがDOM操作の実際の動作！</strong>
        </Typography>
      </Alert>
      <Alert severity="warning" sx={{ my: 2 }}>
        <Typography>
          <strong>⚠️ うまくいかない場合：</strong>
          <br />• コードをコピペした後、必ず<strong>Enterキー</strong>を押す
          <br />
          • エラーが出た場合は、ページを再読み込み（F5）して再実行
          <br />
          • ChromeとFirefoxで「Console」タブの位置が異なることがある
          <br />• それでも分からない場合は、「これは参考程度」として先に進んでOK
        </Typography>
      </Alert>
      <Space />
      <Typography variant="h2" id="dom-problems">
        生のDOM操作の課題とモダンなアプローチ
      </Typography>
      <Typography variant="h3" id="problems">
        生のDOM操作の課題
      </Typography>
      <BulletPoints
        items={[
          "<strong>パフォーマンス</strong>: 頻繁なDOM操作はブラウザの描画処理に負荷をかける",
          "<strong>保守性</strong>: 複雑なアプリケーションでは状態管理が困難になる",
          "<strong>可読性</strong>: DOMの構造とJavaScriptのロジックが混在しがち",
          "<strong>デバッグ</strong>: 動的に変更される要素の状態追跡が困難",
          "<strong>再利用性</strong>: コードの再利用が難しく、重複しやすい",
        ]}
      />
      <Typography variant="h3" id="modern-solutions">
        モダンなアプローチ：フレームワークの活用
      </Typography>
      <BulletPoints items={modernAlternatives} />
      <Typography variant="h4" id="virtual-dom">
        仮想DOM（Virtual DOM）の仕組み
      </Typography>{" "}
      <Typography>
        Reactなどで使用される仮想DOMは、生のDOM操作の課題を解決する技術：
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          my: 3,
          p: 3,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "grey.800" : "grey.100",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6">🔄 仮想DOMの処理フロー</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography>
            1️⃣ <strong>状態変更</strong> → useState などで状態が更新される
          </Typography>
          <Typography>
            2️⃣ <strong>仮想DOM作成</strong> → メモリ上に軽量なDOM表現を構築
          </Typography>
          <Typography>
            3️⃣ <strong>差分計算</strong> → 前回の仮想DOMと比較して変更点を検出
          </Typography>
          <Typography>
            4️⃣ <strong>最適化された更新</strong> → 必要最小限のDOM操作のみを実行
          </Typography>
        </Box>
      </Box>
      <Alert severity="info" sx={{ my: 2 }}>
        <Typography>
          <strong>💡 パフォーマンス比較：</strong>
          <br />• <strong>生のDOM操作</strong>：1000回の更新 =
          1000回のDOM操作（重い）
          <br />• <strong>仮想DOM</strong>：1000回の状態更新 =
          1回の最適化されたDOM操作（軽い）
        </Typography>
      </Alert>
      <Space /> {/* 9. 現代でも直接DOM操作が必要な特殊ケース */}
      <Typography variant="h2" id="when-use-dom">
        現代でも直接DOM操作が必要な特殊ケース
      </Typography>
      <Alert severity="warning" sx={{ my: 2 }}>
        <Typography>
          <strong>📍 重要な理解：</strong>
          <br />
          現代のWeb開発では<strong>99%の場面でフレームワークが自動処理</strong>
          しますが、
          <br />
          稀に直接DOM操作が必要な場合が存在。
        </Typography>
      </Alert>
      <Typography variant="h3" id="rare-cases">
        直接DOM操作が必要な稀なケース
      </Typography>
      <BulletPoints
        items={[
          "<strong>useRef でのDOM参照</strong>：input要素にフォーカスを当てる、スクロール位置を制御する",
          "<strong>サードパーティライブラリとの統合</strong>：React以外のライブラリ（jQuery、Chart.js等）を組み込む",
          "<strong>パフォーマンス最適化</strong>：アニメーションやCanvas操作など、極めて高頻度な更新",
          "<strong>ブラウザAPI の直接利用</strong>：Intersection Observer、Resize Observer等の使用",
        ]}
      />
      <Typography variant="h4" id="useref-example">
        例：useRefを使った直接DOM操作
      </Typography>
      <CodeBlock
        code={`import { useRef, useEffect } from 'react';

function MyComponent() {
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // コンポーネントマウント時に入力欄にフォーカス
    if (inputRef.current) {
      inputRef.current.focus(); // ← 直接DOM操作
    }
  }, []);
  
  const handleScrollToTop = () => {
    // ページトップにスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' }); // ← 直接DOM操作
  };
  
  return (
    <div>
      <input ref={inputRef} placeholder="自動でフォーカスされます" />
      <button onClick={handleScrollToTop}>トップに戻る</button>
    </div>
  );
}`}
        language="tsx"
      />
      <Space />
      {/* 10. 学習の要点とまとめ */}
      <Typography variant="h2" id="learning-summary">
        学習の要点とまとめ
      </Typography>
      <Alert severity="success" sx={{ my: 2 }}>
        <Typography>
          <strong>🎯 この章で理解すべきポイント：</strong>
        </Typography>
      </Alert>
      <Typography variant="h3" id="key-understanding">
        核心的な理解
      </Typography>
      <BulletPoints
        items={[
          "<strong>DOM = ブラウザが作る操作可能なオブジェクト</strong>：HTMLファイルからブラウザが構築",
          "<strong>ユーザーが見ているのはDOM</strong>：HTMLファイルそのものではない",
          "<strong>現代は直接操作しない</strong>：React等のフレームワークが自動処理",
          "<strong>フレームワークの価値を理解</strong>：なぜ仮想DOMや宣言的UIが重要か",
        ]}
      />
      <Space />
      {/* 12. 参考リンク */}
      <Typography variant="h2" id="references">
        参考リンク
      </Typography>
      <Link
        text="MDN DOM公式ドキュメント"
        url="https://developer.mozilla.org/ja/docs/Web/API/Document_Object_Model"
      />
      <Link text="W3C DOM仕様" url="https://www.w3.org/DOM/" />
      <Space />
    </div>
  );
};

export default Dom;
