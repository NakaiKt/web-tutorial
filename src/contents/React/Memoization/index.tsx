import React from "react";
import { Typography, Alert, AlertTitle } from "@mui/material";
import BulletPoints from "@/components/parts/BulletPoints";
import CodeBlock from "@/components/parts/CodeBlock";
import Link from "@/components/parts/Link";

const MemoizationExplanation: React.FC = () => {
  const memoizationConceptList = [
    "計算コストの高い処理結果や関数をキャッシュし、同じ入力に対して再計算を避ける技術",
    "Reactでは主にuseMemoとuseCallbackの2つのフックを使用",
    "依存配列内の値が変更された場合にのみ、新しい値や関数を生成",
    "React.memoと組み合わせることで、コンポーネントの不要な再レンダリングを防止し、パフォーマンスを最適化",
  ];

  const useMemoConceptList = [
    "計算結果やオブジェクトの生成をメモ化する",
    "重い計算処理の結果をキャッシュして、同じ依存関係の場合は再計算を避ける",
    "配列やオブジェクトの参照の安定性を保つ",
    "第一引数に計算関数、第二引数に依存配列を指定",
  ];

  const useCallbackConceptList = [
    "関数の定義をメモ化する",
    "依存配列内の値が変更された場合にのみ、新しい関数を生成",
    "子コンポーネントにpropsとして関数を渡す際の最適化に効果的",
    "React.memoと組み合わせることで子コンポーネントの不要な再レンダリングを防止",
  ];

  const differencesList = [
    "useMemo: 計算結果（値）をメモ化 → const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])",
    "useCallback: 関数の定義をメモ化 → const memoizedCallback = useCallback(() => { doSomething(a, b) }, [a, b])",
    "useMemo(() => fn, deps) は useCallback(fn, deps) と同等",
    "用途に応じて適切に使い分けることでコードの意図が明確になる",
  ];

  const bestPracticesList = [
    "メモ化自体にもコストがかかるため、実際にパフォーマンス問題がある場合に限定使用",
    "依存配列の指定は正確に行う。ESLintのexhaustive-depsルールを活用",
    "プリミティブ値の計算結果には通常メモ化は不要",
    "重い計算処理、大きなオブジェクト/配列の生成、子コンポーネントへの関数渡しで効果的",
  ];
  const whenToUseList = [
    "useMemo: 重い計算処理、大きなデータの変換、オブジェクト/配列の生成",
    "useCallback: 子コンポーネントへの関数props、useEffectの依存関数、カスタムフックの戻り値関数",
    "React.memoで最適化された子コンポーネントに値や関数を渡す場合",
    "参照の等価性が重要なケース（useEffect、useMemo、useCallbackの依存配列内など）",
  ];

  const whenNotToUseList = [
    "プリミティブ値（string、number、boolean）の単純な計算結果 - メモ化のオーバーヘッドの方が高い",
    "毎回異なる結果を返す処理（Date.now()、Math.random()など） - メモ化の意味がない",
    "依存配列が毎回変わる場合 - メモ化が機能せず、むしろ性能が悪化する",
    "軽量な計算や処理 - メモ化のコストの方が計算コストを上回る",
    "一度しか呼ばれない関数や計算 - メモ化の恩恵を受けられない",
    "依存配列に複雑なオブジェクトを含む場合 - 浅い比較では変更を正しく検知できない可能性",
    "デバッグ中やプロトタイプ開発時 - 余計な複雑性を避け、シンプルに保つべき",
    "パフォーマンス測定なしで推測だけで使用する場合 - 実際の効果を確認することが重要",
  ];
  return (
    <div>
      <Typography>
        Memoization（メモ化）は、計算コストの高い処理結果をキャッシュすることで、
        同じ入力に対する再計算を避けるプログラミング技術である。
        <br />
        <br />
        <strong>Reactにおいては</strong>
        、useMemoとuseCallbackの2つのフックを使用して、
        計算結果や関数の不要な再生成を防ぎ、コンポーネントのパフォーマンスを最適化する。
      </Typography>
      <Alert severity="warning" sx={{ mt: 2 }}>
        <AlertTitle>メモ化は最適化技術</AlertTitle>
        重要な注意点として，メモ化は「サイトを動かすために必須」ではなく「パフォーマンス向上のための最適化技術」である。
        基本的な機能実装が完了してから、実際にパフォーマンス問題が発生した箇所に対して適用することが推奨される。
        <br />
        過剰なメモ化は可読性の低下や，パフォーマンスの低下を招く
      </Alert>
      <Typography variant="h2" id="unnecessary-regeneration">
        「不要な再生成」とは何か
      </Typography>
      <Typography>
        Reactコンポーネントが再レンダリングされる際、コンポーネント内のすべての処理が再実行される。
        <strong>
          この中で「実際には変更が不要なのに毎回新しく作り直される処理」が不要な再生成
        </strong>
        である：
      </Typography>
      <Typography variant="h3" id="when-regeneration-occurs">
        再生成が発生するタイミング
      </Typography>
      <BulletPoints
        items={[
          "親コンポーネントが再レンダリングされた時 - 子コンポーネントも自動的に再レンダリング",
          "stateが更新された時 - setStateが呼ばれると必ずコンポーネントが再実行",
          "propsが変更された時 - 親から渡される値が変わると子コンポーネントが再実行",
          "Contextの値が変更された時 - useContextを使っているコンポーネントが再実行",
          "forceUpdateが呼ばれた時 - 強制的な再レンダリング（通常は使わない）",
        ]}
      />
      <Typography variant="h3" id="what-gets-regenerated">
        何が再生成されるか
      </Typography>
      <CodeBlock
        code={`const MyComponent = ({ data }: { data: number[] }) => {
  const [count, setCount] = useState(0);
  
  // ❌ 再レンダリングのたびに毎回新しいオブジェクトを生成（不要な再生成）
  const expensiveConfig = {
    threshold: 100,
    multiplier: 1.5,
    cache: new Map()  // 毎回新しいMapが作られる
  };
  
  // ❌ 再レンダリングのたびに毎回新しい配列を生成（不要な再生成）
  const processedData = data.map(item => item * 2);
  
  // ❌ 再レンダリングのたびに毎回新しい関数を生成（不要な再生成）
  const handleClick = () => {
    console.log('Clicked!');
  };
  
  // ❌ 再レンダリングのたびに重い計算を毎回実行（不要な再計算）
  let expensiveResult = 0;
  for (let i = 0; i < 1000000; i++) {
    expensiveResult += Math.sqrt(i) * data.length;
  }
  
  return (
    <div>
      <div>Count: {count}</div>
      <div>Result: {expensiveResult}</div>
      <button onClick={() => setCount(c => c + 1)}>
        Increment (全体が再実行される)
      </button>
      <ChildComponent 
        config={expensiveConfig}     // 毎回新しいオブジェクト
        data={processedData}         // 毎回新しい配列
        onClick={handleClick}        // 毎回新しい関数
      />
    </div>
  );
};`}
        language="tsx"
      />
      <Typography variant="h3" id="unnecessary-regeneration-problems">
        不要な再生成による問題
      </Typography>
      <BulletPoints
        items={[
          "パフォーマンス低下 - 毎回重い計算や複雑なオブジェクト生成が実行される",
          "子コンポーネントの不要な再レンダリング - propsの参照が変わることでReact.memoが効かない",
          "メモリ使用量増加 - 不要なオブジェクトが大量生成され、ガベージコレクションの負荷が増加",
          "useEffectの無限ループ - 依存配列に毎回新しいオブジェクトが含まれると無限実行",
          "UIの瞬間的な遅延 - 60fps(16.67ms)を超える処理でスムーズさが失われる",
        ]}
      />
      <Typography variant="h3" id="solution-with-memoization">
        メモ化による解決
      </Typography>
      <CodeBlock
        code={`const MyComponent = ({ data }: { data: number[] }) => {
  const [count, setCount] = useState(0);
  
  // ✅ オブジェクトをメモ化 - dataが変わらない限り同じオブジェクトを再利用
  const expensiveConfig = useMemo(() => ({
    threshold: 100,
    multiplier: 1.5,
    cache: new Map()
  }), []);
  
  // ✅ 配列の処理をメモ化 - dataが変わった時のみ再計算
  const processedData = useMemo(() => {
    return data.map(item => item * 2);
  }, [data]);
  
  // ✅ 関数をメモ化 - 依存関係が変わらない限り同じ関数を再利用
  const handleClick = useCallback(() => {
    console.log('Clicked!');
  }, []);
  
  // ✅ 重い計算をメモ化 - dataが変わった時のみ再計算
  const expensiveResult = useMemo(() => {
    console.log('重い計算実行'); // dataが変わった時のみ出力される
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.sqrt(i) * data.length;
    }
    return result;
  }, [data]);
  
  return (
    <div>
      <div>Count: {count}</div>
      <div>Result: {expensiveResult}</div>
      <button onClick={() => setCount(c => c + 1)}>
        Increment (重い計算は再実行されない)
      </button>
      <ChildComponent 
        config={expensiveConfig}     // 同じオブジェクト参照
        data={processedData}         // dataが同じなら同じ配列参照  
        onClick={handleClick}        // 同じ関数参照
      />
    </div>
  );
};`}
        language="tsx"
      />
      <Typography variant="h2" id="memoization-concept">
        Memoization の基本概念
      </Typography>
      <Typography>
        Memoizationは、同じ入力に対する計算結果をキャッシュすることで、処理を最適化する技術：
      </Typography>
      <BulletPoints items={memoizationConceptList} />
      <Typography variant="h2" id="usememo">
        useMemo - 値のメモ化
      </Typography>{" "}
      <Typography>
        useMemoは計算結果やオブジェクトの生成をメモ化するフックである：
      </Typography>
      <BulletPoints items={useMemoConceptList} />
      <Typography variant="h3" id="usememo-syntax">
        useMemo の構文
      </Typography>
      <CodeBlock
        code={`const memoizedValue = useMemo(() => {
  // 重い計算処理
  return computeExpensiveValue(dependency1, dependency2);
}, [dependency1, dependency2]); // 依存配列`}
        language="typescript"
      />
      <Typography variant="h3" id="usememo-examples">
        useMemo の使用例
      </Typography>
      <Typography>重い計算処理をメモ化する例である：</Typography>
      <CodeBlock
        code={`import React, { useState, useMemo } from 'react';
import { Button, Typography, Box } from '@mui/material';

const ExpensiveCalculationExample = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  // 重い計算処理（フィボナッチ数列の計算）
  const fibonacciValue = useMemo(() => {
    console.log('重い計算を実行中...');
    const fibonacci = (n: number): number => {
      if (n <= 1) return n;
      return fibonacci(n - 1) + fibonacci(n - 2);
    };
    return fibonacci(count);
  }, [count]); // countが変わった時のみ再計算

  // フィルタリング処理をメモ化
  const filteredData = useMemo(() => {
    console.log('データフィルタリング実行中...');
    const largeData = Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      value: Math.random() * 100,
    }));
    return largeData.filter(item => item.value > count * 10);
  }, [count]);

  return (
    <Box>
      <Typography>Count: {count}</Typography>
      <Typography>Other State: {otherState}</Typography>
      <Typography>Fibonacci({count}): {fibonacciValue}</Typography>
      <Typography>Filtered Data Length: {filteredData.length}</Typography>
      
      <Button 
        variant="contained" 
        onClick={() => setCount(c => c + 1)} 
        sx={{ mr: 1 }}
      >
        Increment Count (重い計算実行)
      </Button>
      <Button 
        variant="outlined" 
        onClick={() => setOtherState(s => s + 1)}
      >
        Change Other State (計算実行されない)
      </Button>
    </Box>
  );
};`}
        language="tsx"
      />
      <Typography variant="h2" id="usecallback">
        useCallback - 関数のメモ化
      </Typography>
      <Typography>useCallbackは関数の定義をメモ化するフックである：</Typography>
      <BulletPoints items={useCallbackConceptList} />
      <Typography variant="h3" id="usecallback-syntax">
        useCallback の構文
      </Typography>
      <CodeBlock
        code={`const memoizedCallback = useCallback(
  () => {
    // 実行したい処理
    doSomething(dependency1, dependency2);
  },
  [dependency1, dependency2], // 依存配列
);`}
        language="typescript"
      />
      <Typography variant="h3" id="usecallback-examples">
        useCallback の使用例
      </Typography>{" "}
      <Typography>
        子コンポーネントに渡す関数をメモ化してパフォーマンスを最適化する例である：
      </Typography>
      <CodeBlock
        code={`import React, { useState, useCallback } from 'react';
import { Button, Box, Typography } from '@mui/material';

interface ChildComponentProps {
  onClick: () => void;
  id: string;
}

const MemoizedChildComponent = React.memo(({ onClick, id }: ChildComponentProps) => {
  console.log(\`MemoizedChildComponent (\${id}) rendered\`);
  return (
    <Button variant="outlined" onClick={onClick} sx={{ mt: 1 }}>
      Child Button (\${id})
    </Button>
  );
});
MemoizedChildComponent.displayName = 'MemoizedChildComponent';

const CallbackOptimizationExample = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  // useCallback を使わない場合 - 毎回新しい関数が生成される
  const handleIncrementWithoutCallback = () => {
    setCount(prev => prev + 1);
  };

  // useCallback を使う場合 - 依存配列が変わらない限り同じ関数を返す
  const handleIncrementWithCallback = useCallback(() => {
    setCount(prev => prev + 1);
  }, []); // setCount(prev => prev + 1) の形式なら依存配列は空でOK

  console.log('Parent component rendered');

  return (
    <Box>
      <Typography variant="h6">Parent Component</Typography>
      <Typography>Count: {count}</Typography>
      <Typography>Other State: {otherState}</Typography>
      
      <Button 
        variant="contained" 
        onClick={() => setCount(c => c + 1)} 
        sx={{ mr: 1 }}
      >
        Increment Count
      </Button>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={() => setOtherState(s => s + 1)}
      >
        Change Other State
      </Button>

      <Box sx={{ mt: 2, p: 2, border: '1px dashed grey' }}>
        <Typography variant="subtitle1">Child WITHOUT useCallback:</Typography>
        <MemoizedChildComponent 
          onClick={handleIncrementWithoutCallback} 
          id="No Callback" 
        />
      </Box>

      <Box sx={{ mt: 2, p: 2, border: '1px dashed grey' }}>
        <Typography variant="subtitle1">Child WITH useCallback:</Typography>
        <MemoizedChildComponent 
          onClick={handleIncrementWithCallback} 
          id="With Callback" 
        />
      </Box>
    </Box>
  );
};`}
        language="tsx"
      />
      <Typography variant="h2" id="differences">
        useMemo vs useCallback - 使い分け
      </Typography>{" "}
      <Typography>
        useMemoとuseCallbackの主な違いと使い分けのポイントは以下の通りである：
      </Typography>
      <BulletPoints items={differencesList} />
      <Typography variant="h3" id="combined-example">
        組み合わせ実例
      </Typography>
      <Typography>
        useMemoとuseCallbackを効果的に組み合わせた実例である：
      </Typography>
      <CodeBlock
        code={`import React, { useState, useMemo, useCallback } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Box } from '@mui/material';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // 重いフィルタリング処理をuseMemoでメモ化
  const filteredTodos = useMemo(() => {
    console.log('フィルタリング処理実行');
    let filtered = todos;

    // 検索フィルタ
    if (searchTerm) {
      filtered = filtered.filter(todo => 
        todo.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // ステータスフィルタ
    switch (filter) {
      case 'active':
        return filtered.filter(todo => !todo.completed);
      case 'completed':
        return filtered.filter(todo => todo.completed);
      default:
        return filtered;
    }
  }, [todos, filter, searchTerm]);

  // 統計情報をuseMemoでメモ化
  const todoStats = useMemo(() => {
    console.log('統計計算実行');
    return {
      total: todos.length,
      completed: todos.filter(todo => todo.completed).length,
      active: todos.filter(todo => !todo.completed).length,
    };
  }, [todos]);

  // 各種ハンドラーをuseCallbackでメモ化
  const addTodo = useCallback((text: string) => {
    setTodos(prev => [...prev, {
      id: Date.now(),
      text,
      completed: false
    }]);
  }, []);

  const toggleTodo = useCallback((id: number) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);

  return (
    <Box>
      <TextField
        label="Search todos"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      
      <Box sx={{ mb: 2 }}>
        <Button onClick={() => setFilter('all')}>All ({todoStats.total})</Button>
        <Button onClick={() => setFilter('active')}>Active ({todoStats.active})</Button>
        <Button onClick={() => setFilter('completed')}>Completed ({todoStats.completed})</Button>
      </Box>

      <List>
        {filteredTodos.map(todo => (
          <ListItem key={todo.id}>
            <ListItemText 
              primary={todo.text}
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            />
            <Button onClick={() => toggleTodo(todo.id)}>
              {todo.completed ? 'Undo' : 'Complete'}
            </Button>
            <Button onClick={() => deleteTodo(todo.id)} color="error">
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};`}
        language="tsx"
      />{" "}
      <Typography variant="h2" id="when-to-use">
        いつ使うべきか
      </Typography>
      <Typography>メモ化を効果的に活用するためのガイドライン：</Typography>
      <BulletPoints items={whenToUseList} />
      <Typography variant="h2" id="when-not-to-use">
        いつ使うべきでないか
      </Typography>
      <Typography>
        メモ化は万能ではなく、適切でない場面で使用するとパフォーマンスが悪化する可能性がある。
        以下のような場合はメモ化を避けるべきである：
      </Typography>
      <BulletPoints items={whenNotToUseList} />
      <Typography variant="h3" id="memoization-overhead-example">
        メモ化のオーバーヘッド例
      </Typography>
      <Typography>メモ化が逆効果になる具体例を以下に示す：</Typography>
      <CodeBlock
        code={`// ❌ 悪い例: プリミティブ値の簡単な計算をメモ化
const BadExample = ({ a, b }: { a: number; b: number }) => {
  // この程度の計算にメモ化は不要（オーバーヘッドの方が大きい）
  const sum = useMemo(() => a + b, [a, b]);
  const product = useMemo(() => a * b, [a, b]);
  
  return <div>{sum} × {product}</div>;
};

// ❌ 悪い例: 依存配列が毎回変わる
const BadExample2 = ({ data }: { data: any[] }) => {
  // dataが毎回新しい配列なので、メモ化が機能しない
  const processedData = useMemo(() => {
    return data.map(item => ({ ...item, processed: true }));
  }, [data]); // dataの参照が毎回変わるため意味がない
  
  return <div>{processedData.length}</div>;
};

// ❌ 悪い例: ランダム値をメモ化
const BadExample3 = () => {
  // 毎回異なる値を返すものをメモ化しても意味がない
  const randomValue = useMemo(() => Math.random(), []); // 一度だけ生成される
  const currentTime = useMemo(() => Date.now(), []); // 初回のみの時刻
  
  return <div>{randomValue} - {currentTime}</div>;
};

// ✅ 良い例: 適切なメモ化の使用
const GoodExample = ({ items }: { items: string[] }) => {
  // 重い処理をメモ化
  const expensiveResult = useMemo(() => {
    console.log('重い計算実行');
    return items.reduce((acc, item) => {
      // 複雑な処理をシミュレート
      for (let i = 0; i < 1000000; i++) { /* heavy calculation */ }
      return acc + item.length;
    }, 0);
  }, [items]);

  // 子コンポーネントに渡すコールバックをメモ化
  const handleClick = useCallback((index: number) => {
    console.log('Clicked item:', items[index]);
  }, [items]);

  return (
    <div>
      <div>Result: {expensiveResult}</div>
      {items.map((item, index) => (
        <ExpensiveChildComponent 
          key={index}
          item={item}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};`}
        language="tsx"
      />{" "}
      <Typography variant="h3" id="how-to-measure-performance">
        パフォーマンス測定方法
      </Typography>
      <Typography>
        「パフォーマンス測定なしで推測だけで使用する」ことを避けるため、
        <strong>React Profilerを使うのが最も簡単で効果的</strong>である。
        React標準機能なので追加インストール不要で、メモ化の効果を数値で確認できる：
      </Typography>
      <Typography variant="h4" id="react-profiler-main">
        React Profiler - 推奨の測定方法
      </Typography>
      <CodeBlock
        code={`import { Profiler } from 'react'; // React標準ライブラリから import

// onRenderCallback の引数は完全に固定（React が決めている）
const onRenderCallback = (
  id: string,                    // 【固定】Profilerに指定したid
  phase: 'mount' | 'update',     // 【固定】マウント or アップデート  
  actualDuration: number,        // 【固定】実際のレンダリング時間（ms）
  baseDuration: number,          // 【固定】メモ化なしでの推定時間（ms）
  startTime: number,             // 【固定】レンダリング開始時刻
  commitTime: number,            // 【固定】コミット完了時刻
  interactions: Set<any>         // 【固定】インタラクション情報（通常使わない）
) => {
  // ここの処理内容は自由にカスタマイズ可能
  console.log(\`📊 \${id} - \${phase}フェーズ\`);
  console.log(\`⏱️  実行時間: \${actualDuration.toFixed(2)}ms\`);
  console.log(\`📈 推定時間: \${baseDuration.toFixed(2)}ms\`);
  
  // メモ化の効果を確認（この判定ロジックは自由）
  if (baseDuration > actualDuration) {
    const improvement = baseDuration - actualDuration;
    console.log(\`✅ メモ化効果: \${improvement.toFixed(2)}ms短縮 (\${((improvement/baseDuration)*100).toFixed(1)}%改善)\`);
  } else {
    console.log(\`❌ メモ化効果なし（むしろ悪化している可能性）\`);
  }
  
  // パフォーマンス閾値のチェック（自由なカスタマイズ例）
  if (actualDuration > 16) { // 60fps = 16.67ms
    console.warn(\`⚠️  レンダリングが重い: \${actualDuration.toFixed(2)}ms > 16ms\`);
  }
};

// 使用方法（idは自由に設定、onRender名は固定）
const App = () => (
  <Profiler id="MyComponent" onRender={onRenderCallback}>
    <YourMemoizedComponent />
  </Profiler>
);`}
        language="tsx"
      />
      <Typography variant="h4" id="profiler-usage-examples">
        実践的な使用例
      </Typography>
      <CodeBlock
        code={`// 複数のコンポーネントを同時に測定
const MultiComponentProfiler = () => {
  const profileCallback = (id: string, phase: string, actualDuration: number, baseDuration: number) => {
    // idで対象コンポーネントを判別
    switch(id) {
      case 'TodoList':
        console.log(\`📝 TodoList: \${actualDuration.toFixed(2)}ms\`);
        break;
      case 'SearchBox':  
        console.log(\`🔍 SearchBox: \${actualDuration.toFixed(2)}ms\`);
        break;
      default:
        console.log(\`🔧 \${id}: \${actualDuration.toFixed(2)}ms\`);
    }
  };

  return (
    <div>
      <Profiler id="TodoList" onRender={profileCallback}>
        <TodoListComponent />
      </Profiler>
      
      <Profiler id="SearchBox" onRender={profileCallback}>
        <SearchBoxComponent />
      </Profiler>
    </div>
  );
};

// 開発時のみプロファイリングを有効にする実用パターン
const conditionalProfiler = (id: string, children: React.ReactNode) => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (!isDevelopment) {
    return <>{children}</>;
  }

  const devProfileCallback = (id: string, phase: string, actualDuration: number) => {
    // 開発時のみログ出力
    console.log(\`[DEV] \${id}: \${actualDuration.toFixed(2)}ms\`);
  };

  return (
    <Profiler id={id} onRender={devProfileCallback}>
      {children}
    </Profiler>
  );
};`}
        language="tsx"
      />
      <Typography variant="h4" id="profiler-spec-details">
        React Profiler の仕様詳細
      </Typography>
      <BulletPoints
        items={[
          "React標準ライブラリ - 追加インストール不要で、import { Profiler } from 'react' で使用",
          "onRenderCallback の引数は完全固定 - React が内部で呼び出すため、引数の順序・型は変更不可",
          "id属性は自由設定 - コンポーネントを識別するための任意の文字列",
          "コールバック内の処理は完全自由 - ログ出力、データ保存、アラート表示など何でも可能",
          "ネストしたProfilerも使用可能 - 親子関係のコンポーネントを個別に測定できる",
          "Production ビルドでも動作 - ただし、Development モードの方が詳細なデータが取得可能",
          "actualDuration vs baseDuration - この差がメモ化の効果を示す最重要指標",
        ]}
      />
      <Typography variant="h4" id="quick-debug-method">
        最も手軽なデバッグ方法
      </Typography>
      <Typography>
        開発中に「本当にメモ化が効いているか？」を即座に確認したい場合は、
        この1行を追加するだけで十分である：
      </Typography>
      <CodeBlock
        code={`// メモ化対象のコンポーネントを Profiler で囲むだけ
<Profiler 
  id="確認したいコンポーネント名" 
  onRender={(id, phase, actual, base) => 
    console.log(\`\${id}: \${actual.toFixed(1)}ms (推定\${base.toFixed(1)}ms)\`)
  }
>
  <YourComponent />
</Profiler>

// これだけで以下が確認できる：
// - コンポーネント: 5.2ms (推定8.7ms) ← メモ化効果あり
// - コンポーネント: 12.1ms (推定12.0ms) ← メモ化効果なし`}
        language="tsx"
      />
      <Typography variant="h2" id="best-practices">
        ベストプラクティス
      </Typography>{" "}
      <Typography>メモ化を効果的に使用するための推奨事項：</Typography>
      <BulletPoints items={bestPracticesList} />
      <Typography variant="h2" id="related-links">
        関連リンク
      </Typography>
      <Typography>Reactのメモ化について更に詳しく学習するために：</Typography>
      <Link
        text="React公式ドキュメント - useMemo"
        url="https://react.dev/reference/react/useMemo"
      />
      <Link
        text="React公式ドキュメント - useCallback"
        url="https://react.dev/reference/react/useCallback"
      />
      <Link
        text="React公式ドキュメント - React.memo"
        url="https://react.dev/reference/react/memo"
      />
      <Link
        text="React DevTools - Profiler"
        url="https://react.dev/blog/2018/09/10/introducing-the-react-profiler"
      />
    </div>
  );
};

export default MemoizationExplanation;
