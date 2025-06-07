import { Typography, Alert, Box } from "@mui/material";
import BulletPoints from "@/components/parts/BulletPoints";
import Space from "@/components/parts/Space";
import Link from "@/components/parts/Link";
import CodePreview from "@/components/parts/CodePreview";
import CodeBlock from "@/components/parts/CodeBlock";
import Image from "next/image";

const Dom = () => {
  const domUseCases = [
    "HTMLをJavaScriptで動的に変更したい（要素の追加・削除・修正）",
    "ユーザーの操作（クリック、入力など）に応じてページを更新したい",
    "フォームの値を取得して処理したい",
    "CSSクラスの追加・削除でスタイルを変更したい",
    "Web APIから取得したデータを画面に表示したい",
  ];

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
      <Typography>
        DOM（Document Object
        Model）は、HTMLドキュメントをJavaScriptから操作するための
        <strong>プログラミングインターフェース</strong>。
        <br />
        <br />
        <strong>📝 DOMの役割をわかりやすく説明すると：</strong>
        <br />
        HTMLは静的な文書構造ですが、DOMはそれを
        <strong>プログラムで操作可能なオブジェクト</strong>
        に変換する仕組みです。
        <br />
        例えて言うなら、HTMLが「設計図」だとすると、DOMは「実際に触って動かせる模型」のようなもの。
        <br />
      </Typography>
      <Image
        src="/assets/dom.png"
        alt="DOMのイメージ"
        width={600}
        height={400}
      />
      <Typography>
        <br />
        <strong>🔄 具体的な変換プロセス：</strong>
        <br />
        1. ブラウザがHTMLを読み込む
        <br />
        2. HTMLの各タグ（div, p, buttonなど）を「Elementオブジェクト」として作成
        <br />
        3. これらのオブジェクトを階層構造（ツリー）として組み立て
        <br />
        4. JavaScriptからこのツリー構造にアクセス・操作が可能になる
        <br />
        <br />
        つまりDOMは、<strong>静的なHTMLと動的なJavaScriptを繋ぐ橋渡し役</strong>
        として機能します。
        <br />
        ReactやVueなどのモダンフレームワークを理解するためにも、DOMの基本的な仕組みの理解が不可欠。
      </Typography>
      <Space />
      <Link
        text="MDN DOM公式ドキュメント"
        url="https://developer.mozilla.org/ja/docs/Web/API/Document_Object_Model"
      />
      <Link text="W3C DOM仕様" url="https://www.w3.org/DOM/" />
      <Space />
      <Typography variant="h2" id="use-cases">
        DOMを使う場面
      </Typography>
      <Typography>DOMは以下のような場面で重要な役割を果たす：</Typography>
      <BulletPoints items={domUseCases} />
      <Space />
      <Typography variant="h2" id="dom-structure">
        DOMの構造
      </Typography>{" "}
      <Typography>
        DOMは、HTMLドキュメントを階層的なツリー構造として表現する。
        <br />
        各HTML要素がNodeオブジェクトとして表現され、親子関係を持つ。
      </Typography>
      <CodeBlock
        code={`<!-- HTML -->
<html>
  <head>
    <title>ページタイトル</title>
  </head>
  <body>
    <div id="container">
      <p class="text">Hello World!</p>
      <button onclick="handleClick()">クリック</button>
    </div>
  </body>
</html>`}
        language="html"
      />{" "}
      <Typography>
        上記のHTMLは、以下のようなDOMツリーとして表現される：
      </Typography>
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
      <Typography variant="h2" id="dom-objects">
        主要なDOMオブジェクト
      </Typography>
      <Typography>DOMは以下のような主要なオブジェクトで構成される：</Typography>
      <BulletPoints items={domElements} />
      <Space />
      <Typography variant="h2" id="dom-operations">
        基本的なDOM操作
      </Typography>
      <Typography>DOMを使った基本的な操作方法：</Typography>
      <BulletPoints items={domMethods} />
      <Space />
      <Typography variant="h3" id="element-selection">
        要素の取得
      </Typography>
      <Typography>HTMLの要素をJavaScriptから取得する方法：</Typography>
      <CodeBlock
        code={`
// IDで要素を取得
const element = document.getElementById('container');

// CSSセレクターで要素を取得（最初の1つ）
const firstParagraph = document.querySelector('p.text');

// CSSセレクターで要素を取得（全て）
const allButtons = document.querySelectorAll('button');

// タグ名で要素を取得
const allDivs = document.getElementsByTagName('div');

// クラス名で要素を取得
const textElements = document.getElementsByClassName('text');
        `}
        language="javascript"
      />
      <Alert severity="info" sx={{ my: 2 }}>
        <Typography>
          <strong>推奨：</strong> 現代では<code>querySelector()</code>と
          <code>querySelectorAll()</code>の使用が推奨される。
          <br />
          CSSセレクターが使えるため、より柔軟で直感的な要素選択が可能。
        </Typography>
      </Alert>
      <Space />
      <Typography variant="h3" id="element-manipulation">
        要素の操作
      </Typography>
      <Typography>取得した要素の内容やスタイルを変更する方法：</Typography>
      <CodeBlock
        code={`
// テキスト内容の変更
const paragraph = document.querySelector('p');
paragraph.textContent = '新しいテキスト';
paragraph.innerHTML = '<strong>太字のテキスト</strong>';

// 属性の操作
const button = document.querySelector('button');
button.setAttribute('class', 'btn-primary');
button.getAttribute('id'); // 属性値を取得
button.removeAttribute('onclick');

// スタイルの変更
paragraph.style.color = 'blue';
paragraph.style.fontSize = '20px';
paragraph.style.backgroundColor = '#f0f0f0';

// CSSクラスの操作
paragraph.classList.add('highlight');
paragraph.classList.remove('old-style');
paragraph.classList.toggle('active');
paragraph.classList.contains('highlight'); // true/false
        `}
        language="javascript"
      />
      <Space />
      <Typography variant="h3" id="element-creation">
        要素の作成・追加・削除
      </Typography>
      <Typography>
        新しい要素を作成したり、既存の要素を削除する方法：
      </Typography>
      <CodeBlock
        code={`
// 新しい要素を作成
const newDiv = document.createElement('div');
newDiv.className = 'dynamic-content';
newDiv.textContent = '動的に作成された要素';

// 既存の要素に追加
const container = document.querySelector('#container');
container.appendChild(newDiv);

// 特定の位置に挿入
const firstChild = container.firstElementChild;
container.insertBefore(newDiv, firstChild);

// 要素を削除
const elementToRemove = document.querySelector('.old-element');
elementToRemove.remove(); // 現代的な方法
// または
elementToRemove.parentNode.removeChild(elementToRemove); // 古い方法

// 要素を置換
const oldElement = document.querySelector('.old');
const newElement = document.createElement('p');
newElement.textContent = '置換された要素';
oldElement.parentNode.replaceChild(newElement, oldElement);
        `}
        language="javascript"
      />
      <Space />
      <Typography variant="h3" id="event-handling">
        イベント処理
      </Typography>
      <Typography>ユーザーの操作に応じて処理を実行する方法：</Typography>
      <CodeBlock
        code={`
// クリックイベントの処理
const button = document.querySelector('button');
button.addEventListener('click', function(event) {
  console.log('ボタンがクリックされました！');
  event.preventDefault(); // デフォルトの動作を防ぐ
});

// フォーム送信の処理
const form = document.querySelector('form');
form.addEventListener('submit', function(event) {
  event.preventDefault(); // ページの再読み込みを防ぐ
  
  const formData = new FormData(form);
  const inputValue = formData.get('username');
  console.log('入力値:', inputValue);
});

// 入力値の変更監視
const input = document.querySelector('input');
input.addEventListener('input', function(event) {
  console.log('現在の値:', event.target.value);
});

// 複数のイベントリスナーを追加
function handleMouseOver() {
  console.log('マウスが乗った');
}

function handleMouseOut() {
  console.log('マウスが離れた');
}

const element = document.querySelector('.hover-target');
element.addEventListener('mouseover', handleMouseOver);
element.addEventListener('mouseout', handleMouseOut);

// イベントリスナーを削除
element.removeEventListener('mouseover', handleMouseOver);
        `}
        language="javascript"
      />
      <Space />
      <Typography variant="h2" id="dom-problems">
        生のDOM操作の課題
      </Typography>
      <Typography>直接的なDOM操作には以下のような課題がある：</Typography>
      <BulletPoints
        items={[
          "パフォーマンス: 頻繁なDOM操作はブラウザの描画処理に負荷をかける",
          "保守性: 複雑なアプリケーションでは状態管理が困難になる",
          "可読性: DOMの構造とJavaScriptのロジックが混在しがち",
          "デバッグ: 動的に変更される要素の状態追跡が困難",
          "再利用性: コードの再利用が難しく、重複しやすい",
        ]}
      />
      <Space />
      <Typography variant="h2" id="modern-alternatives">
        モダンな代替手段
      </Typography>
      <Typography>
        現代のWeb開発では、以下のようなフレームワークやライブラリが生のDOM操作の代替として使用される：
      </Typography>
      <BulletPoints items={modernAlternatives} />
      <Space />
      <Typography variant="h3" id="virtual-dom">
        仮想DOM（Virtual DOM）
      </Typography>
      <Typography>
        Reactなどで使用される仮想DOMは、生のDOM操作の課題を解決する技術：
      </Typography>
      <BulletPoints
        items={[
          "メモリ上に軽量なDOM表現を保持",
          "変更前後の仮想DOMの差分を計算（差分検出）",
          "必要最小限のDOM操作のみを実行",
          "パフォーマンスの大幅な向上を実現",
        ]}
      />
      <Space />
      <Alert severity="info" sx={{ my: 2 }}>
        <Typography>
          <strong>学習のポイント：</strong>
          <br />
          DOMの基本的な仕組みを理解することで、ReactやVueなどのモダンフレームワークがなぜ便利なのか、
          どのような問題を解決しているのかがより深く理解できる。
          <br />
          特に、パフォーマンスや保守性の観点から、なぜ仮想DOMや宣言的UIが重要なのかを把握することが大切。
        </Typography>
      </Alert>
      <Space />
      <Typography variant="h2" id="practical-example">
        実践的な例：動的なTo-Doリスト
      </Typography>
      <Typography>
        生のDOM操作を使ったシンプルなTo-Doリストの実装例：
      </Typography>
      <CodePreview
        code={`
<div id="todo-app">
  <h3>To-Doリスト</h3>
  <div>
    <input type="text" id="todo-input" placeholder="新しいタスクを入力">
    <button id="add-button">追加</button>
  </div>
  <ul id="todo-list"></ul>
</div>

<script>
  // 要素の取得
  const input = document.getElementById('todo-input');
  const addButton = document.getElementById('add-button');
  const todoList = document.getElementById('todo-list');

  // タスク追加処理
  function addTodo() {
    const text = input.value.trim();
    if (text === '') return;

    // 新しいリストアイテムを作成
    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.alignItems = 'center';
    li.style.padding = '8px';
    li.style.marginBottom = '4px';
    li.style.backgroundColor = '#f5f5f5';
    li.style.borderRadius = '4px';

    // テキストを表示するスパン
    const textSpan = document.createElement('span');
    textSpan.textContent = text;

    // 削除ボタンを作成
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '削除';
    deleteButton.style.backgroundColor = '#ff4444';
    deleteButton.style.color = 'white';
    deleteButton.style.border = 'none';
    deleteButton.style.padding = '4px 8px';
    deleteButton.style.borderRadius = '4px';
    deleteButton.style.cursor = 'pointer';

    // 削除ボタンのクリック処理
    deleteButton.addEventListener('click', function() {
      li.remove();
    });

    // 要素を組み立て
    li.appendChild(textSpan);
    li.appendChild(deleteButton);
    todoList.appendChild(li);

    // 入力フィールドをクリア
    input.value = '';
  }

  // イベントリスナーの設定
  addButton.addEventListener('click', addTodo);
  input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      addTodo();
    }
  });
</script>
        `}
      />
      <Space />
      <Alert severity="warning" sx={{ my: 2 }}>
        <Typography>
          <strong>注意：</strong>
          <br />
          上記の例では、スタイリングをJavaScriptで直接指定している。
          <br />
          実際の開発では、CSSクラスを使用してスタイルとロジックを分離することが推奨される。
          <br />
          また、複雑なアプリケーションでは、状態管理やイベント管理が煩雑になりがち。
        </Typography>
      </Alert>
      <Space />
      <Typography variant="h2" id="what-is-dom">
        DOMとは何か？より詳しく
      </Typography>
      <Typography>
        DOMの役割を理解するために、HTMLとJavaScriptがどのように連携するかを具体例で見てみましょう。
      </Typography>
      <Space />
      <Typography variant="h3" id="without-dom">
        DOMがない場合の問題
      </Typography>
      <Typography>
        もしDOMが存在しなかったら、以下のような問題が発生します：
      </Typography>
      <BulletPoints
        items={[
          "HTMLは単なるテキストファイル → JavaScriptから要素を特定できない",
          "要素の変更方法が標準化されていない → ブラウザごとに異なる実装",
          "イベント処理の仕組みがない → ユーザー操作に応答できない",
          "階層構造を理解できない → 親子関係の概念がない",
        ]}
      />
      <Space />
      <Typography variant="h3" id="dom-as-bridge">
        DOMが提供する「橋渡し」機能
      </Typography>
      <Typography>
        DOMは以下のような標準化された仕組みを提供することで、HTMLとJavaScriptを繋げます：
      </Typography>
      <Space />
      <Typography variant="h4" id="dom-bridge-1">
        1. 統一されたアクセス方法
      </Typography>
      <CodeBlock
        code={`// DOMがあるから、このような統一された方法で要素にアクセスできる
const button = document.getElementById('myButton');
const paragraph = document.querySelector('p.important');

// DOMがなければ、ブラウザごとに異なる方法が必要になってしまう`}
        language="javascript"
      />
      <Space />
      <Typography variant="h4" id="dom-bridge-2">
        2. 標準化された操作方法
      </Typography>
      <CodeBlock
        code={`// DOMがあるから、どのブラウザでも同じ方法で要素を操作できる
button.textContent = '新しいテキスト';  // テキスト変更
button.style.color = 'red';            // スタイル変更
button.classList.add('active');        // クラス追加

// 要素の追加・削除も標準化されている
const newElement = document.createElement('div');
document.body.appendChild(newElement);`}
        language="javascript"
      />
      <Space />
      <Typography variant="h4" id="dom-bridge-3">
        3. イベントシステム
      </Typography>
      <CodeBlock
        code={`// DOMがあるから、ユーザーの操作を統一された方法で処理できる
button.addEventListener('click', function() {
  console.log('ボタンがクリックされました！');
});

// マウス、キーボード、フォームなど、様々なイベントに対応
input.addEventListener('input', handleInputChange);
form.addEventListener('submit', handleFormSubmit);`}
        language="javascript"
      />
      <Space />
      <Alert severity="info" sx={{ my: 2 }}>
        <Typography>
          <strong>💡 重要なポイント：</strong>
          <br />
          DOMは「プロトコル」というよりも、
          <strong>「API（Application Programming Interface）」</strong>
          と表現する方が正確です。
          <br />
          HTMLドキュメントをプログラムから操作するための
          <strong>標準化されたインターフェース</strong>を提供しています。
          <br />
          <br />
          これにより、開発者はブラウザの種類に関係なく、統一された方法でWebページを動的に制御できるようになります。
        </Typography>
      </Alert>
      <Space />
      <Typography variant="h2" id="what-user-sees">
        重要：ユーザーが実際に見ているのはDOM
      </Typography>
      <Alert severity="warning" sx={{ my: 2 }}>
        <Typography>
          <strong>🔑 核心的な理解：</strong>
          <br />
          <strong>
            ユーザーがブラウザで見ているのは、HTMLファイルそのものではなく、DOMツリーです！
          </strong>
        </Typography>
      </Alert>
      <Typography variant="h3" id="html-vs-dom-user-view">
        HTMLとDOMの違い：ユーザーの視点から
      </Typography>
      <Typography>
        この違いを理解するために、具体的な流れを見てみましょう：
      </Typography>
      <Space />
      <Typography variant="h4" id="step-by-step-process">
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
      <Space />
      <Typography variant="h4" id="practical-example">
        🔍 具体例で理解する
      </Typography>
      <Typography>
        以下の例で、HTMLファイルとユーザーが見る画面の関係を確認しましょう：
      </Typography>
      <Space />
      <Typography variant="h5">元のHTMLファイル（静的なテキスト）</Typography>
      <CodeBlock
        code={`<!DOCTYPE html>
<html>
<head>
    <title>サンプルページ</title>
</head>
<body>
    <h1>元のタイトル</h1>
    <p id="message">元のメッセージ</p>
    <button onclick="changeContent()">変更</button>
    
    <script>
        function changeContent() {
            // DOMを操作（HTMLファイルは変更されない）
            document.getElementById('message').textContent = '変更されたメッセージ';
            document.querySelector('h1').style.color = 'red';
        }
    </script>
</body>
</html>`}
        language="html"
      />
      <Space />
      <Typography variant="h5">重要なポイント：</Typography>
      <Alert severity="info" sx={{ my: 2 }}>
        <Typography>
          <strong>💡 ここが重要：</strong>
          <br />
          1. <strong>ボタンをクリックする前</strong>：ユーザーが見る画面 ＝
          HTMLファイルから作成されたDOM
          <br />
          2. <strong>ボタンをクリックした後</strong>：ユーザーが見る画面 ＝
          JavaScriptで変更されたDOM
          <br />
          <br />
          <strong>📁 HTMLファイルは最初から最後まで変更されません！</strong>
          <br />
          変更されるのは、ブラウザのメモリ上にあるDOMツリーだけです。
        </Typography>
      </Alert>
      <Space />
      <Typography variant="h3" id="react-context">
        Reactの文脈での「DOMを変更する」の意味
      </Typography>
      <Typography>
        あなたが言及したReactでの「DOMを変更する」「DOMにアクセスする」という表現は、まさにこの概念を指しています：
      </Typography>
      <Space />
      <BulletPoints
        items={[
          "<strong>「DOMを変更する」</strong> = ブラウザのメモリ上にあるDOMツリーのオブジェクトを変更する",
          "<strong>「DOMにアクセスする」</strong> = document.querySelector()などでDOMツリーの要素オブジェクトを取得する",
          "<strong>「DOM操作」</strong> = JavaScript経由でDOMツリーの要素を追加・削除・修正する",
          "<strong>「生のDOM操作」</strong> = Reactなどのフレームワークを使わず、直接DOMツリーを操作する",
        ]}
      />
      <Space />
      <Typography variant="h4" id="react-virtual-dom">
        Reactの仮想DOMが解決する問題
      </Typography>
      <Typography>
        この理解を踏まえると、Reactの仮想DOMの意義がより明確になります：
      </Typography>
      <Space />
      <BulletPoints
        items={[
          "<strong>問題</strong>：生のDOM操作は重い処理（画面の再描画が頻繁に発生）",
          "<strong>Reactの解決策</strong>：軽量な仮想DOMで変更を管理し、実際のDOMへの操作を最小限に",
          "<strong>結果</strong>：ユーザーは同じ画面を見るが、パフォーマンスが大幅に向上",
        ]}
      />
      <Space />
      <Alert severity="success" sx={{ my: 2 }}>
        <Typography>
          <strong>🎯 まとめ：</strong>
          <br />✅ <strong>ユーザーが見ているのは「DOM」</strong>
          （HTMLファイルではない）
          <br />✅ <strong>HTMLファイルは「設計図」</strong>
          、DOMは「実際の建物」
          <br />✅ <strong>JavaScriptでの変更</strong>はすべてDOM上で行われる
          <br />✅ <strong>Reactの「DOM操作」</strong>
          も、このDOMツリーへの操作を指している
          <br />
          <br />
          この理解があると、Reactの useRef や useEffect でのDOM操作、
          さらにはSSR（サーバーサイドレンダリング）の概念も理解しやすくなります！
        </Typography>
      </Alert>
    </div>
  );
};

export default Dom;
