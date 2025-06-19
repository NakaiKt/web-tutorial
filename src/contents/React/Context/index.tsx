import React, {
  createContext,
  useContext,
  useState,
  useReducer,
  useMemo,
} from "react";
import {
  Typography,
  Alert,
  AlertTitle,
  Box,
  Button,
  Paper,
  TextField,
} from "@mui/material";
import BulletPoints from "@/components/parts/BulletPoints";
import CodeBlock from "@/components/parts/CodeBlock";
import Link from "@/components/parts/Link";
import Table from "@/components/parts/Table";

// デモ用のContextとReducer
type CountAction =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" };
interface CountState {
  count: number;
}

const countReducer = (state: CountState, action: CountAction): CountState => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
};

// 基本的なContext
interface SimpleContextType {
  value: string;
  setValue: (value: string) => void;
}

const SimpleContext = createContext<SimpleContextType | undefined>(undefined);

// useReducer + Context の例
interface CountContextType {
  state: CountState;
  dispatch: React.Dispatch<CountAction>;
}

const CountContext = createContext<CountContextType | undefined>(undefined);

// Custom Hook例
const useSimpleContext = () => {
  const context = useContext(SimpleContext);
  if (!context) {
    throw new Error(
      "useSimpleContext must be used within SimpleContextProvider"
    );
  }
  return context;
};

const useCountContext = () => {
  const context = useContext(CountContext);
  if (!context) {
    throw new Error("useCountContext must be used within CountContextProvider");
  }
  return context;
};

// Provider コンポーネント例
const SimpleContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [value, setValue] = useState("");

  const contextValue = useMemo(
    () => ({
      value,
      setValue,
    }),
    [value]
  );

  return (
    <SimpleContext.Provider value={contextValue}>
      {children}
    </SimpleContext.Provider>
  );
};

const CountContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(countReducer, { count: 0 });

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  return (
    <CountContext.Provider value={contextValue}>
      {children}
    </CountContext.Provider>
  );
};

// デモ用コンポーネント
const SimpleDemo: React.FC = () => {
  const { value, setValue } = useSimpleContext();

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        シンプルなContext使用例
      </Typography>
      <TextField
        label="値を入力"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        fullWidth
        sx={{ mb: 1 }}
      />
      <Typography variant="body2">現在の値: {value || "(空)"}</Typography>
    </Paper>
  );
};

const CountDemo: React.FC = () => {
  const { state, dispatch } = useCountContext();

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        useReducer + Context使用例
      </Typography>
      <Typography variant="h4" sx={{ mb: 2 }}>
        カウント: {state.count}
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          variant="contained"
          onClick={() => dispatch({ type: "increment" })}
        >
          +1
        </Button>
        <Button
          variant="contained"
          onClick={() => dispatch({ type: "decrement" })}
        >
          -1
        </Button>
        <Button variant="outlined" onClick={() => dispatch({ type: "reset" })}>
          リセット
        </Button>
      </Box>
    </Paper>
  );
};

export const ContextContent: React.FC = () => {
  const propsDrillingProblems = [
    "中間コンポーネントが使わない props を受け取り、子に渡すだけになる",
    "コンポーネントの階層が深くなると props の追跡が困難",
    "中間コンポーネントの変更が必要で、関係のないコンポーネントにも影響",
    "型定義やテストが複雑になり、保守性が低下",
  ];

  const contextBenefits = [
    "深い階層の子コンポーネントに直接値を渡せる",
    "中間コンポーネントを経由する必要がない",
    "グローバルな状態管理が簡潔に実装できる",
    "カスタムフックと組み合わせて使いやすいAPIを提供できる",
  ];

  const whenToUseContext = [
    "認証情報（ユーザー情報、ログイン状態）",
    "テーマ設定（ライト・ダークモード、色設定）",
    "言語設定（多言語対応のロケール情報）",
    "アプリケーション全体の設定値",
    "モーダルやトーストなどのUI状態",
  ];

  const whenNotToUseContext = [
    "頻繁に変更される値（毎秒更新されるカウンターなど）",
    "一部のコンポーネントでしか使わない状態",
    "props で十分渡せる浅い階層の値",
    "パフォーマンスが重要で最適化が必要な状態",
  ];

  const performanceConsiderations = [
    "Context の値が変更されると、useContext を使うすべてのコンポーネントが再レンダリング",
    "Context を複数に分割して影響範囲を限定する",
    "useMemo や useCallback を使って Context の値を最適化",
    "React.memo を使って不要な再レンダリングを防ぐ",
  ];

  const bestPractices = [
    "Context用のカスタムフックを作成して使いやすいAPIを提供",
    "TypeScriptで型安全なContextを作成",
    "Provider コンポーネントで undefined チェックを行う",
    "Context は適切な粒度で分割し、責任を明確にする",
    "デフォルト値は実際には使われないようにし、エラーで検知",
  ];

  // コード例の定義
  const basicContextCode = `// 1. Context の作成
import { createContext, useContext, useState } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 2. Custom Hook の作成
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// 3. Provider コンポーネント
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 4. 使用例
const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header style={{ background: theme === 'light' ? '#fff' : '#333' }}>
      <button onClick={toggleTheme}>
        {theme === 'light' ? 'ダーク' : 'ライト'}モードに切り替え
      </button>
    </header>
  );
};`;

  const useReducerContextCode = `// useReducer + Context パターン
import { createContext, useContext, useReducer } from 'react';

// State と Action の型定義
interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

type TodoAction = 
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'SET_FILTER'; payload: 'all' | 'active' | 'completed' };

// Reducer 関数
const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, { id: Date.now(), text: action.payload, completed: false }]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};

// Context の作成
interface TodoContextType {
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Custom Hook
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within TodoProvider');
  }
  return context;
};

// Provider
export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all'
  });

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};`;

  const performanceOptimizationCode = `// パフォーマンス最適化の例
import { createContext, useContext, useState, useMemo, useCallback } from 'react';

interface OptimizedContextType {
  data: string[];
  addData: (item: string) => void;
  removeData: (index: number) => void;
}

const OptimizedContext = createContext<OptimizedContextType | undefined>(undefined);

export const OptimizedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<string[]>([]);

  // useCallback で関数をメモ化
  const addData = useCallback((item: string) => {
    setData(prev => [...prev, item]);
  }, []);

  const removeData = useCallback((index: number) => {
    setData(prev => prev.filter((_, i) => i !== index));
  }, []);

  // useMemo で Context の値をメモ化
  const contextValue = useMemo(() => ({
    data,
    addData,
    removeData
  }), [data, addData, removeData]);

  return (
    <OptimizedContext.Provider value={contextValue}>
      {children}
    </OptimizedContext.Provider>
  );
};

// Context を分割する例
// ❌ 悪い例：すべてを1つのContextに
interface BadContextType {
  user: User;
  theme: Theme;
  notifications: Notification[];
  settings: Settings;
  // これらすべてが変更されると全コンポーネントが再レンダリング
}

// ✅ 良い例：責任ごとに分割
interface UserContextType { user: User; updateUser: (user: User) => void; }
interface ThemeContextType { theme: Theme; toggleTheme: () => void; }
interface NotificationContextType { notifications: Notification[]; addNotification: (n: Notification) => void; }`;
  const contextComparisonData = {
    columns: [
      { header: "特徴", key: "feature" },
      { header: "useState/useReducer", key: "useState" },
      { header: "Context API", key: "context" },
      { header: "外部ライブラリ (Redux等)", key: "external" },
    ],
    rows: [
      {
        feature: "学習コスト",
        useState: "低い",
        context: "中程度",
        external: "高い",
      },
      {
        feature: "セットアップ",
        useState: "簡単",
        context: "中程度",
        external: "複雑",
      },
      {
        feature: "型安全性",
        useState: "TypeScriptで良好",
        context: "TypeScriptで良好",
        external: "ライブラリ次第",
      },
      {
        feature: "デバッグ",
        useState: "React DevToolsで可能",
        context: "React DevToolsで可能",
        external: "専用ツールあり",
      },
      {
        feature: "パフォーマンス",
        useState: "良好",
        context: "注意が必要",
        external: "最適化されている",
      },
      {
        feature: "適用範囲",
        useState: "コンポーネント内",
        context: "アプリケーション全体",
        external: "アプリケーション全体",
      },
      {
        feature: "ボイラープレート",
        useState: "少ない",
        context: "中程度",
        external: "多い",
      },
    ],
  };

  return (
    <div>
      <Typography variant="h1" gutterBottom>
        React Context API
      </Typography>
      <Typography>
        React Context
        APIは、コンポーネントツリー全体で状態を共有するためのReactの仕組みです。
        Props
        Drilling（プロパティのバケツリレー）を解決し、グローバル状態管理を簡潔に実装できます。
      </Typography>
      <Alert severity="info" sx={{ mt: 2 }}>
        <AlertTitle>Context APIの位置づけ</AlertTitle>
        Context
        APIは「React標準の状態共有機能」です。外部ライブラリ（Redux、Zustand等）の代替として、
        中小規模のアプリケーションでは十分な機能を提供します。
        ただし、大規模なアプリケーションや複雑な状態管理が必要な場合は、専用ライブラリの検討も重要です。
      </Alert>
      <Typography variant="h2" id="props-drilling-problem">
        Props Drillingの問題
      </Typography>
      <Typography>
        Context APIが解決する主要な問題は「Props Drilling」です。
        これは、深い階層の子コンポーネントに値を渡すために、
        中間の複数のコンポーネントを経由してpropsを渡し続ける現象です。
      </Typography>
      <BulletPoints items={propsDrillingProblems} />
      <CodeBlock
        code={`// ❌ Props Drilling の例
const App = () => {
  const [user, setUser] = useState(null);
  return <Layout user={user} setUser={setUser} />;
};

const Layout = ({ user, setUser }) => (
  <div>
    <Header user={user} setUser={setUser} />
    <Main user={user} />
  </div>
);

const Header = ({ user, setUser }) => (
  <header>
    <UserMenu user={user} setUser={setUser} />
  </header>
);

const UserMenu = ({ user, setUser }) => (
  <div>
    {user ? \`こんにちは、\${user.name}さん\` : 'ログインしてください'}
    <button onClick={() => setUser(null)}>ログアウト</button>
  </div>
);

// Layout、Header は user を使わないが、propsとして受け取る必要がある`}
        language="typescript"
      />
      <Typography variant="h2" id="context-benefits">
        Context APIの利点
      </Typography>
      <BulletPoints items={contextBenefits} />{" "}
      <Typography variant="h2" id="basic-implementation">
        基本的な実装
      </Typography>
      <Typography>
        Context APIの基本的な使い方は、以下の4つのステップで構成されます：
      </Typography>
      <BulletPoints
        items={[
          "createContext でコンテキストを作成",
          "Provider コンポーネントで値を提供",
          "useContext フックで値を取得",
          "Custom Hook で使いやすいAPIを提供（推奨）",
        ]}
      />{" "}
      <CodeBlock code={basicContextCode} language="typescript" />
      <Typography variant="h3" id="context-data-flow">
        Contextのデータフローと責任分離
      </Typography>
      <Typography>
        Context APIを理解する上で重要なのは、
        <strong>どこで何を定義するか</strong>という責任の分離です。
        上記のコード例で注目すべきポイントを詳しく見てみましょう。
      </Typography>
      <Typography sx={{ mt: 2 }}>
        <code>toggleTheme</code>のような状態変更関数は、
        <strong>必ずProviderコンポーネント内で定義</strong>する必要があります。
        これは、関数が状態（<code>theme</code>）にアクセスして変更するためです。
        Custom Hook（<code>useTheme</code>
        ）の役割は、Contextから値を取り出すことと型安全性の提供に限定されます。
      </Typography>
      <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
        <AlertTitle>重要なポイント</AlertTitle>
        <code>useContext</code>で取得できるのは、Provider の <code>value</code>{" "}
        プロパティで渡したオブジェクトの中身<strong>だけ</strong>です。
        <code>value</code>
        で渡していない値や関数は、子コンポーネントから直接アクセスできません。
        これがContext
        APIの基本的な制約であり、データフローを明確にする重要な仕組みです。
      </Alert>
      <Typography>
        以下のコード例で、Contextのデータフローと各コンポーネントの責任を確認してみましょう：
      </Typography>
      <CodeBlock
        code={`// 1. Provider で状態と関数を定義
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // ✅ 状態変更関数はProviderで定義（状態と同じスコープにある必要がある）
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // ✅ valueで渡したもののみが子コンポーネントで利用可能
  return (
    <ThemeContext.Provider value={{ 
      theme,           // 状態値
      toggleTheme      // 状態変更関数
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 2. Custom Hook：値の取り出しと型安全性を提供
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  // ✅ Providerのvalueで渡されたオブジェクトをそのまま返す
  return context; // { theme, toggleTheme }
};

// 3. 子コンポーネント：Contextの値を消費
const Header: React.FC = () => {
  // ✅ Providerのvalueで渡された値を分割代入で取得
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header>
      <button onClick={toggleTheme}>  {/* Providerで定義された関数を実行 */}
        {theme === 'light' ? 'ダーク' : 'ライト'}モードに切り替え
      </button>
    </header>
  );
};`}
        language="typescript"
      />
      <Typography variant="h3" id="context-scope">
        Contextのスコープと制限事項
      </Typography>
      <Typography>
        Context
        APIには明確なスコープと制限があります。これらの制限を理解することで、
        より適切な設計ができるようになります：
      </Typography>
      <BulletPoints
        items={[
          "Provider の value で渡された値のみが useContext で取得可能",
          "Provider の外側にあるコンポーネントはContext値にアクセスできない",
          "状態の変更関数は必ずProvider内で定義し、value経由で渡す",
          "Custom Hookは値の取り出しと型安全性の提供が主な役割",
        ]}
      />
      <Typography sx={{ mt: 2 }}>
        以下は、よくある間違いと正しい実装の対比です：
      </Typography>
      <CodeBlock
        code={`// ❌ 間違った実装例
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  
  // ❌ Custom Hook内で新しい関数を定義するのは不適切
  // この関数はProviderの状態にアクセスできないため機能しない
  const toggleTheme = () => {
    console.log('これは動作しません');
  };
  
  return { ...context, toggleTheme }; // ❌ 意味のない関数を追加
};

// ✅ 正しい実装例
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  
  // ✅ Providerから受け取った値をそのまま返す
  // 余計な処理や値の追加は行わない
  return context;
};`}
        language="typescript"
      />
      <Typography variant="h3" id="demo-basic">
        実際の動作確認
      </Typography>
      <SimpleContextProvider>
        <SimpleDemo />
      </SimpleContextProvider>
      <Typography variant="h2" id="advanced-patterns">
        実務的なパターン
      </Typography>
      <Typography variant="h3" id="use-reducer-context">
        useReducer + Context パターン
      </Typography>
      <Typography>
        複雑な状態管理には、useReducerとContextを組み合わせたパターンが効果的です。
        このパターンはReduxライクな状態管理をReact標準機能だけで実現できます。
      </Typography>
      <CodeBlock code={useReducerContextCode} language="typescript" />
      <CountContextProvider>
        <CountDemo />
      </CountContextProvider>
      <Typography variant="h2" id="performance-optimization">
        パフォーマンス最適化
      </Typography>
      <Alert severity="warning" sx={{ mb: 2 }}>
        <AlertTitle>Context使用時の注意点</AlertTitle>
        Contextの値が変更されると、useContextを使用しているすべてのコンポーネントが再レンダリングされます。
        適切な最適化を行わないと、パフォーマンスの問題が発生する可能性があります。
      </Alert>
      <BulletPoints items={performanceConsiderations} />
      <CodeBlock code={performanceOptimizationCode} language="typescript" />
      <Typography variant="h2" id="when-to-use">
        使い分けの指針
      </Typography>
      <Typography variant="h3" id="when-to-use-context">
        Context を使うべき場面
      </Typography>
      <BulletPoints items={whenToUseContext} />
      <Typography variant="h3" id="when-not-to-use-context">
        Context を使わない方が良い場面
      </Typography>
      <BulletPoints items={whenNotToUseContext} />
      <Typography variant="h2" id="best-practices">
        ベストプラクティス
      </Typography>
      <BulletPoints items={bestPractices} />
      <Typography variant="h2" id="comparison">
        他の状態管理手法との比較
      </Typography>
      <Table
        columns={contextComparisonData.columns}
        rows={contextComparisonData.rows}
      />
      <Typography variant="h2" id="real-world-example">
        実践例：テーマ管理
      </Typography>
      <Typography>
        このサイトでも実際に使用している<code>ThemeContext</code>を例に、
        実際のアプリケーションでのContext活用方法を見てみましょう。
      </Typography>{" "}
      <Link
        text="ThemeContext.tsx のソースコード"
        url="https://github.com/your-repo/src/contexts/ThemeContext.tsx"
      />
      <Typography sx={{ mt: 2 }}>
        右上のテーマ切り替えボタンがContext APIを使用して実装されています。
        アプリケーション全体でテーマ状態を共有し、任意のコンポーネントからテーマの変更が可能です。
      </Typography>
      <Typography variant="h2" id="conclusion">
        まとめ
      </Typography>
      <Typography>
        React Context APIは、適切に使用することで以下のメリットを提供します：
      </Typography>
      <BulletPoints
        items={[
          "Props Drillingの解決によるコードの簡潔化",
          "グローバル状態管理の実現",
          "React標準機能のため追加ライブラリが不要",
          "TypeScriptとの優れた相性",
          "Custom Hookと組み合わせた使いやすいAPI設計",
        ]}
      />
      <Alert severity="success" sx={{ mt: 2 }}>
        <AlertTitle>学習のポイント</AlertTitle>
        Context
        APIは段階的に学習することをお勧めします。まずは基本的なuseStateの代替として使い始め、
        慣れてきたらuseReducerとの組み合わせやパフォーマンス最適化に取り組んでください。
      </Alert>
    </div>
  );
};
