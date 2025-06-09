# React State 管理と DOM 操作 コード規約

## 基本原則

### useState vs useRef の使い分け

React において状態管理は、表示に影響するかどうかで使い分ける。

#### useState を使用する場合

- UI（画面）に表示される値
- ユーザーに見せたい状態の変化
- 再レンダリングが必要な値

#### useRef を使用する場合

- DOM 要素への参照
- 再レンダリングをトリガーしたくない値
- 前回値の保持
- タイマー ID などの管理

## DOM 操作における注意点

### DOM 操作の 2 つのパターン

#### パターン 1: DOM 要素への直接操作（画面が変わる）

```typescript
// ✅ 適切な使用例
const inputRef = useRef<HTMLInputElement>(null);

const focusInput = () => {
  inputRef.current?.focus(); // フォーカスが視覚的に変化
};

const clearInput = () => {
  if (inputRef.current) {
    inputRef.current.value = ""; // 入力値がクリアされる
  }
};
```

#### パターン 2: useRef の値変更（画面が変わらない）

```typescript
// ❌ 間違った期待
const countRef = useRef(0);

const increment = () => {
  countRef.current += 1; // 値は変わるが画面は更新されない
};

// JSXでの表示
return <Typography>{countRef.current}</Typography>; // 更新されない

// ✅ 正しい方法
const [count, setCount] = useState(0);

const increment = () => {
  setCount((prev) => prev + 1); // 画面が更新される
};
```

## 実践的なパターン

### 1. フォーカス管理

```typescript
const [query, setQuery] = useState(""); // 検索クエリの状態
const inputRef = useRef<HTMLInputElement>(null); // DOM要素への参照

const handleClear = () => {
  setQuery(""); // 状態をクリア（画面更新）
  inputRef.current?.focus(); // フォーカス操作（画面変化）
};
```

### 2. 前回値の保持

```typescript
const [count, setCount] = useState(0);
const prevCountRef = useRef<number>();

useEffect(() => {
  prevCountRef.current = count; // 前回値を保存（再レンダリングなし）
});
```

### 3. タイマー管理

```typescript
const [seconds, setSeconds] = useState(0); // 表示用の秒数
const intervalRef = useRef<NodeJS.Timeout | null>(null); // タイマーID保持

useEffect(() => {
  if (isRunning) {
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  }

  return () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };
}, [isRunning]);
```

## よくある間違いと対策

### 間違い 1: 表示用の値に useRef を使用

```typescript
// ❌ 悪い例
const countRef = useRef(0);
return <Typography>{countRef.current}</Typography>; // 更新されない

// ✅ 良い例
const [count, setCount] = useState(0);
return <Typography>{count}</Typography>;
```

### 間違い 2: DOM 操作で state を使用

```typescript
// ❌ 悪い例：DOM操作に不要な再レンダリング
const [inputValue, setInputValue] = useState("");
const clearInput = () => {
  setInputValue(""); // 不要な再レンダリング
};

// ✅ 良い例：直接DOM操作
const inputRef = useRef<HTMLInputElement>(null);
const clearInput = () => {
  if (inputRef.current) {
    inputRef.current.value = ""; // 直接操作
  }
};
```

## パフォーマンス考慮事項

### useRef 使用時の利点

- 再レンダリングが発生しない
- 参照の等価性が保持される
- メモリ効率が良い

### useState 使用時の注意

- 必要最小限の粒度で分割
- 関連する状態はまとめて管理
- 計算結果は useMemo で最適化を検討

## TypeScript での型安全性

```typescript
// DOM要素の型指定
const inputRef = useRef<HTMLInputElement>(null);
const divRef = useRef<HTMLDivElement>(null);

// 値の型指定
const countRef = useRef<number>(0);
const dataRef = useRef<{ id: string; value: number } | null>(null);

// タイマーIDの型指定
const intervalRef = useRef<NodeJS.Timeout | null>(null);
```

## まとめ

- **useState**: 画面に影響する値、UI の状態管理
- **useRef**: DOM 操作、値の永続化、再レンダリング不要な値
- **DOM 操作**: 直接的な要素操作は画面が変わる、Ref の値変更は画面が変わらない
- **適切な使い分け**: 用途に応じた最適な Hook の選択が重要
