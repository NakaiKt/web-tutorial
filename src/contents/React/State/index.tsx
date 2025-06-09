import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Alert,
  Divider,
  TextField,
} from "@mui/material";
import CodeBlock from "@/components/parts/CodeBlock";
import BulletPoints from "@/components/parts/BulletPoints";
import Table from "@/components/parts/Table";

export const StateContent: React.FC = () => {
  // デモ用のstate
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(1); // SSR対応のためuseStateに変更

  // デモ用のref
  const countRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // 実践例1: フォーカス管理用のstate
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  // 実践例2: 前回値保持用のstate
  const [demoCount, setDemoCount] = useState(0);
  const prevDemoCountRef = useRef<number>(0);

  // 実践例3: タイマー管理用のstate
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  // レンダリング回数をカウント（SSR対応）
  useEffect(() => {
    setRenderCount((prev) => prev + 1);
  }, []); // 空の依存配列でマウント時のみ実行

  // 実践例2: 前回値保持のための副作用
  useEffect(() => {
    prevDemoCountRef.current = demoCount;
  });

  // 実践例3: タイマー管理のための副作用
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleUseStateIncrement = () => {
    setCount(count + 1);
  };

  const handleUseRefIncrement = () => {
    countRef.current += 1;
    console.log("useRef count:", countRef.current);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };
  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // DOM操作のデモ用関数を追加
  const changeInputStyle = () => {
    if (inputRef.current) {
      const currentBg = inputRef.current.style.backgroundColor;
      inputRef.current.style.backgroundColor =
        currentBg === "yellow" ? "" : "yellow";
      inputRef.current.style.border =
        currentBg === "yellow" ? "" : "2px solid red";
    }
  };

  const addTextToInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "DOM操作で追加されたテキスト";
    }
  };

  // 実践例1: フォーカス管理のハンドラー
  const handleSearchClear = () => {
    setSearchQuery("");
    searchInputRef.current?.focus();
  };

  // 実践例2: 前回値保持のハンドラー
  const handleDemoIncrement = () => {
    setDemoCount((prev) => prev + 1);
  };

  // 実践例3: タイマー管理のハンドラー
  const handleTimerToggle = () => {
    setIsRunning(!isRunning);
  };

  const handleTimerReset = () => {
    setSeconds(0);
    setIsRunning(false);
  };
  return (
    <Box>
      <Typography>
        Reactにおけるstateの管理には主に<code>useState</code>と
        <code>useRef</code>の2つの方法があります。
        それぞれ異なる特徴と用途を持っており、適切な使い分けが重要です。
      </Typography>{" "}
      <Typography component="p">
        <strong>stateとは</strong>
        、コンポーネント内で管理される「状態」や「値」のことです。
        ユーザーの操作やデータの変更に応じて、コンポーネントの表示や動作を制御するために使用されます。
      </Typography>
      {/* useStateの特徴 */}
      <Typography variant="h2" id="usestate-features">
        useStateの特徴
      </Typography>
      <BulletPoints
        items={[
          "値が変更されると<strong>再レンダリング</strong>が発生する",
          "コンポーネントの<strong>表示内容</strong>に影響する値の管理に使用",
          "非同期で状態が更新される",
          "関数コンポーネントの<strong>状態管理</strong>の基本",
        ]}
      />{" "}
      <CodeBlock
        language="tsx"
        code={`// useStateの基本的な使い方
const [count, setCount] = useState(0);

const handleIncrement = () => {
  setCount(count + 1); // 再レンダリングが発生
};

return (
  <Box>
    <Typography>カウント: {count}</Typography>
    <Button onClick={handleIncrement}>増加</Button>
  </Box>
);`}
      />{" "}
      {/* useRefの特徴 */}
      <Typography variant="h2" id="useref-features">
        useRefの特徴
      </Typography>{" "}
      <BulletPoints
        items={[
          "値が変更されても<strong>再レンダリングは発生しない</strong>",
          "DOM要素への<strong>直接アクセス</strong>に使用",
          "前回の値や<strong>永続化したいデータ</strong>の保持に使用",
          "<strong>ミュータブル</strong>（変更可能）なオブジェクトを返す",
        ]}
      />{" "}
      <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          useRefがミュータブルな理由と活用場面
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          useRefが<strong>ミュータブル</strong>
          （変更可能）である理由は、Reactのレンダリングサイクルに
          影響されずに値を保持・変更する必要があるためです。通常のJavaScriptオブジェクトと同様に、
          <code>.current</code>プロパティを直接変更できます。
        </Typography>
        <BulletPoints
          items={[
            "<strong>DOM要素への参照</strong>: DOM要素自体がミュータブルなオブジェクトなので、同じ参照を保持",
            "<strong>副作用のための値保持</strong>: レンダリング間で値を保持し、直接変更が可能",
            "<strong>パフォーマンス最適化</strong>: 新しいオブジェクトを作成せず、同じ参照を再利用",
            "<strong>タイマーIDやイベントリスナー</strong>: 動的に作成される値の管理で直接変更が必要",
            "<strong>前回値の保持</strong>: レンダリングをトリガーせずに前の状態を記憶",
            "<strong>フラグの管理</strong>: コンポーネントのマウント状態など、内部状態の管理",
          ]}
        />
      </Alert>{" "}
      <CodeBlock
        language="tsx"
        code={`// useRefの基本的な使い方
const countRef = useRef(0);
const inputRef = useRef<HTMLInputElement>(null);

const handleIncrement = () => {
  countRef.current += 1; // 再レンダリングは発生しない
  console.log(countRef.current);
};

const focusInput = () => {
  inputRef.current?.focus(); // DOM要素への直接アクセス
};

return (
  <Box>
    <TextField inputRef={inputRef} />
    <Button onClick={focusInput}>フォーカス</Button>
    <Button onClick={handleIncrement}>カウント増加</Button>
  </Box>
);`}
      />{" "}
      {/* 実際のデモ */}
      <Typography variant="h2" id="demo-comparison">
        実際の動作比較
      </Typography>{" "}
      <Typography component="p">
        以下のデモでuseStateとuseRefの動作の違いを確認できます。
        <strong>useState</strong>
        は値の変更で再レンダリングが発生し、画面に反映されます。
        <strong>useRef</strong>
        は値の変更で再レンダリングが発生せず、コンソールでのみ確認できます。
      </Typography>
      <Typography variant="h3" gutterBottom>
        コードの詳細解説
      </Typography>{" "}
      <CodeBlock
        language="tsx"
        code={`// 完全なデモコンポーネント
const StateDemo: React.FC = () => {
  // useState: 画面に表示される値（再レンダリングあり）
  const [count, setCount] = useState(0);
  
  // useRef: 値を保持するが画面に影響しない（再レンダリングなし）
  const countRef = useRef(0);
  
  // レンダリング回数を追跡するためのuseRef
  const renderCountRef = useRef(0);
  
  // レンダリングのたびにカウントアップ（副作用なし）
  renderCountRef.current += 1;

  const handleUseStateIncrement = () => {
    setCount(count + 1); // 🔄 再レンダリングが発生し、画面が更新される
  };

  const handleUseRefIncrement = () => {
    countRef.current += 1; // ❌ 再レンダリングなし、画面は更新されない
    console.log('useRef count:', countRef.current); // コンソールで値を確認
  };

  return (
    <Box>
      <Typography>レンダリング回数: {renderCountRef.current}</Typography>
      <Typography>useState値: {count}</Typography>
      <Typography>useRef値: {countRef.current} ← 変更されても表示は更新されない</Typography>
      
      <Button onClick={handleUseStateIncrement}>
        useState増加（画面更新）
      </Button>
      <Button onClick={handleUseRefIncrement}>
        useRef増加（画面更新なし）
      </Button>
    </Box>
  );
};`}
      />
      <Typography variant="h3" gutterBottom sx={{ mt: 3 }}>
        実際の動作確認
      </Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        {" "}
        <Typography variant="h6" gutterBottom>
          現在のレンダリング回数: {renderCount}
        </Typography>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            useState（再レンダリングあり）
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            現在の値: {count}
          </Typography>
          <Button variant="contained" onClick={handleUseStateIncrement}>
            useState でカウント増加
          </Button>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            useRef（再レンダリングなし）
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            値はコンソールで確認してください
          </Typography>
          <Button variant="outlined" onClick={handleUseRefIncrement}>
            useRef でカウント増加
          </Button>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            DOM操作の例
          </Typography>{" "}
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <TextField
              inputRef={inputRef}
              placeholder="ここにフォーカスされます"
              size="small"
              sx={{ width: 200 }}
            />
            <Button variant="outlined" size="small" onClick={focusInput}>
              フォーカス
            </Button>
            <Button variant="outlined" size="small" onClick={clearInput}>
              クリア
            </Button>
            <Button variant="outlined" size="small" onClick={changeInputStyle}>
              スタイル変更
            </Button>
            <Button variant="outlined" size="small" onClick={addTextToInput}>
              テキスト追加
            </Button>
          </Box>
        </Box>
      </Paper>{" "}
      {/* 比較表 */}
      <Typography variant="h2" id="comparison-table">
        useState vs useRef 比較表
      </Typography>
      <Table
        columns={[
          { header: "特徴", key: "feature" },
          { header: "useState", key: "useState" },
          { header: "useRef", key: "useRef" },
        ]}
        rows={[
          {
            feature: "再レンダリング",
            useState: "発生する",
            useRef: "発生しない",
          },
          {
            feature: "値の更新",
            useState: "setter関数",
            useRef: ".current プロパティ",
          },
          {
            feature: "初期値の設定",
            useState: "useState(初期値)",
            useRef: "useRef(初期値)",
          },
          {
            feature: "主な用途",
            useState: "UI状態の管理",
            useRef: "DOM操作、値の永続化",
          },
        ]}
      />
      <Box sx={{ mb: 3 }} /> {/* スペース調整 */}
      {/* 使い分けの判断基準 */}
      <Typography variant="h2" id="usage-criteria">
        使い分けの判断基準
      </Typography>{" "}
      <Alert severity="info" sx={{ mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          useState を使う場合
        </Typography>
        <BulletPoints
          items={[
            "画面に表示される値を管理したい",
            "値の変更をユーザーに見せたい",
            "フォームの状態管理",
            "モーダルの開閉状態など",
          ]}
        />
      </Alert>
      <Alert severity="warning" sx={{ mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          useRef を使う場合
        </Typography>
        <BulletPoints
          items={[
            "DOM要素に直接アクセスしたい",
            "値の変更で再レンダリングさせたくない",
            "タイマーIDやインターバルIDの保持",
            "前回の値を覚えておきたい",
          ]}
        />
      </Alert>{" "}
      {/* 実践的な組み合わせパターン */}
      <Typography variant="h2" id="practical-patterns">
        実践的な組み合わせパターン
      </Typography>
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          インタラクティブなデモ
        </Typography>
        <Typography variant="body2">
          以下の例は実際に操作できます。useStateとuseRefの使い分けを体験してみてください。
        </Typography>
      </Alert>
      <Typography variant="h3" id="focus-management">
        1. フォーカス管理
      </Typography>{" "}
      <Typography component="p">
        <strong>何をしているか:</strong>{" "}
        検索フォームでuseStateとuseRefを組み合わせて、
        入力値の状態管理とDOM要素への直接アクセスを行っています。
      </Typography>{" "}
      <Typography component="p">
        <strong>useState の使用:</strong> <code>searchQuery</code>{" "}
        状態で検索クエリを管理し、
        入力値の変更を画面に反映させています。実際に入力することで値が更新されます。
        <br />
        <strong>useRef の使用:</strong> <code>searchInputRef</code>{" "}
        でinput要素への参照を保持し、
        クリアボタンを押すとフォーカスが自動的に戻ります。
      </Typography>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          プレビュー
        </Typography>{" "}
        <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 1, mb: 2 }}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <TextField
              inputRef={searchInputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="検索..."
              size="small"
              sx={{ width: 200 }}
            />
            <Button
              onClick={handleSearchClear}
              variant="contained"
              size="small"
            >
              クリア
            </Button>
          </Box>
        </Box>{" "}
        <CodeBlock
          language="tsx"
          code={`const SearchForm: React.FC = () => {
  const [query, setQuery] = useState(''); // 検索クエリの状態
  const inputRef = useRef<HTMLInputElement>(null); // input要素への参照

  useEffect(() => {
    // コンポーネントマウント時にフォーカス
    inputRef.current?.focus();
  }, []);

  const handleClear = () => {
    setQuery(''); // 状態をクリア
    inputRef.current?.focus(); // フォーカスを戻す
  };

  return (
    <Box>
      <TextField
        inputRef={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="検索..."
      />
      <Button onClick={handleClear}>クリア</Button>
    </Box>
  );
};`}
        />
      </Paper>{" "}
      <Typography variant="h3" id="previous-value">
        2. 前回の値を保持
      </Typography>{" "}
      <Typography component="p">
        <strong>何をしているか:</strong>{" "}
        カウンターで現在の値と前回の値を同時に表示しています。
      </Typography>{" "}
      <Typography component="p">
        <strong>useState の使用:</strong> <code>demoCount</code>{" "}
        状態で現在のカウント値を管理し、
        ボタンを押すと即座に画面が更新されます。
        <br />
        <strong>useRef の使用:</strong> <code>prevDemoCountRef</code>{" "}
        で前回の値を保持し、
        useEffectで毎回レンダリング後に現在の値を保存します。これにより前回と現在の比較が可能です。
      </Typography>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          プレビュー
        </Typography>{" "}
        <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 1, mb: 2 }}>
          <Box>
            <Typography variant="body1" sx={{ mb: 1 }}>
              現在の値: {demoCount}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              前回の値: {prevDemoCountRef.current}
            </Typography>
            <Button
              onClick={handleDemoIncrement}
              variant="contained"
              size="small"
            >
              増加
            </Button>
          </Box>
        </Box>{" "}
        <CodeBlock
          language="tsx"
          code={`const Counter: React.FC = () => {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef<number>();

  useEffect(() => {
    prevCountRef.current = count; // 前回の値を保存
  });

  const prevCount = prevCountRef.current;

  return (
    <Box>
      <Typography>現在の値: {count}</Typography>
      <Typography>前回の値: {prevCount}</Typography>
      <Button onClick={() => setCount(count + 1)}>
        増加
      </Button>
    </Box>
  );
};`}
        />
      </Paper>{" "}
      <Typography variant="h3" id="timer-management">
        3. タイマーの管理
      </Typography>{" "}
      <Typography component="p">
        <strong>何をしているか:</strong>{" "}
        タイマー機能で秒数の表示と開始/停止状態を管理し、
        バックグラウンドで動作するsetIntervalの参照を保持しています。
      </Typography>{" "}
      <Typography component="p">
        <strong>useState の使用:</strong> <code>seconds</code> で経過時間、
        <code>isRunning</code> で
        タイマーの動作状態を管理し、画面表示を更新しています。実際にタイマーが動作します。
        <br />
        <strong>useRef の使用:</strong> <code>intervalRef</code>{" "}
        でsetIntervalのIDを保持し、
        タイマーの停止やクリーンアップ時に使用しています。再レンダリングに影響されません。
      </Typography>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          プレビュー
        </Typography>{" "}
        <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 1, mb: 2 }}>
          <Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
              経過時間: {seconds}秒
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                onClick={handleTimerToggle}
                variant="contained"
                color={isRunning ? "error" : "primary"}
                size="small"
              >
                {isRunning ? "停止" : "開始"}
              </Button>
              <Button
                onClick={handleTimerReset}
                variant="outlined"
                color="secondary"
                size="small"
              >
                リセット
              </Button>
            </Box>
          </Box>
        </Box>{" "}
        <CodeBlock
          language="tsx"
          code={`const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState(0); // 経過時間の状態
  const [isRunning, setIsRunning] = useState(false); // 動作状態
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // タイマーIDの参照

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  return (
    <Box>
      <Typography>経過時間: {seconds}秒</Typography>
      <Button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? '停止' : '開始'}
      </Button>
      <Button onClick={() => {
        setSeconds(0);
        setIsRunning(false);
      }}>
        リセット
      </Button>
    </Box>
  );
};`}
        />
      </Paper>
      {/* パフォーマンスの考慮事項 */}
      <Typography variant="h2" id="performance-considerations">
        パフォーマンスの考慮事項
      </Typography>
      <Alert severity="success" sx={{ mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          パフォーマンス向上のコツ
        </Typography>
        <BulletPoints
          items={[
            "頻繁に変更される値で画面更新が不要な場合はuseRefを使う",
            "useStateは必要最小限の粒度で分割する",
            "useRefは.currentを直接変更してもコンポーネントに通知されない",
            "DOM操作はuseRefを使って直接行う方が効率的",
          ]}
        />
      </Alert>{" "}
      <Typography variant="h3" id="common-mistakes">
        よくある間違い
      </Typography>{" "}
      <CodeBlock
        language="tsx"
        code={`// ❌ 悪い例：画面に表示したいのにuseRefを使用
const BadExample: React.FC = () => {
  const countRef = useRef(0);

  const increment = () => {
    countRef.current += 1;
    // 画面は更新されない！
  };

  return (
    <Box>
      <Typography>カウント: {countRef.current}</Typography> {/* 更新されない */}
      <Button onClick={increment}>増加</Button>
    </Box>
  );
};

// ✅ 良い例：画面に表示する値はuseStateを使用
const GoodExample: React.FC = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prev => prev + 1); // 画面が更新される
  };

  return (
    <Box>
      <Typography>カウント: {count}</Typography>
      <Button onClick={increment}>増加</Button>
    </Box>
  );
};`}
      />
      {/* DOM操作の核心的な違い */}
      <Typography variant="h2" id="dom-vs-react-rendering">
        DOM直接操作 vs React再レンダリング
      </Typography>
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          核心的な違い
        </Typography>
        <Typography variant="body2">
          「useRefでDOM操作した時」と「useStateで再レンダリングした時」の結果の違いは何か？
        </Typography>
      </Alert>
      <Typography variant="h3" gutterBottom>
        1. DOM直接操作（useRef使用）
      </Typography>
      <CodeBlock
        language="tsx"
        code={`// DOM直接操作の例
const inputRef = useRef<HTMLInputElement>(null);

const changeInputValue = () => {
  if (inputRef.current) {
    inputRef.current.value = "新しい値"; // ブラウザのDOM直接変更
  }
  // → 画面は即座に変わるが、Reactは知らない
  // → 他のコンポーネントは再レンダリングされない
  // → React の状態と実際のDOMが不整合になる可能性
};`}
      />
      <Typography variant="h3" gutterBottom sx={{ mt: 3 }}>
        2. React再レンダリング（useState使用）
      </Typography>
      <CodeBlock
        language="tsx"
        code={`// React再レンダリングの例
const [inputValue, setInputValue] = useState("");

const changeInputValue = () => {
  setInputValue("新しい値"); // React の状態変更
  // → React が再レンダリングを実行
  // → 関連する全てのコンポーネントが更新される
  // → React の状態とDOMが一致する
};`}
      />
      <Typography variant="h3" gutterBottom sx={{ mt: 3 }}>
        結果として何が違うのか？
      </Typography>
      <Table
        columns={[
          { header: "項目", key: "item" },
          { header: "DOM直接操作", key: "domDirect" },
          { header: "React再レンダリング", key: "reactRender" },
        ]}
        rows={[
          {
            item: "変更の範囲",
            domDirect: "操作した要素のみ",
            reactRender: "関連する全コンポーネント",
          },
          {
            item: "React状態との整合性",
            domDirect: "不整合になる可能性",
            reactRender: "常に整合性が保たれる",
          },
          {
            item: "パフォーマンス",
            domDirect: "高速（最小限の変更）",
            reactRender: "やや低速（広範囲の更新）",
          },
          {
            item: "予測可能性",
            domDirect: "副作用が起こりうる",
            reactRender: "予測可能で安全",
          },
        ]}
      />
      <Alert severity="warning" sx={{ my: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          重要なポイント
        </Typography>
        <BulletPoints
          items={[
            "<strong>DOM直接操作</strong>: 高速だが、Reactの管理外になる",
            "<strong>React再レンダリング</strong>: 安全で予測可能だが、やや重い",
            "<strong>使い分け</strong>: フォーカスやスクロールはDOM直接、データ表示はReact",
          ]}
        />
      </Alert>
      {/* まとめ */}
      <Typography variant="h2" id="summary">
        まとめ
      </Typography>
      <Alert severity="success" sx={{ mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          重要なポイント
        </Typography>
        <BulletPoints
          items={[
            "<strong>useState</strong>: 画面に表示される値、UIの状態管理に使用",
            "<strong>useRef</strong>: DOM操作、値の永続化、レンダリングに影響しない値に使用",
            "<strong>再レンダリング</strong>: useStateで発生、useRefでは発生しない",
            "<strong>適切な使い分け</strong>: 用途に応じて最適なHookを選択することが重要",
          ]}
        />
      </Alert>{" "}
      <Typography component="p">
        useStateとuseRefの特徴を理解して、適切に使い分けることで、
        効率的で保守性の高いReactアプリケーションを構築できます。 特に
        <strong>パフォーマンス</strong>と<strong>ユーザビリティ</strong>
        のバランスを 考慮した実装を心がけましょう。
      </Typography>
    </Box>
  );
};
