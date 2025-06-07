# React Memoization コード規約

## 基本方針

React のメモ化（useMemo、useCallback、React.memo）は、パフォーマンス最適化の重要な手法であるが、適切な場面でのみ使用する。早期最適化は避け、実際のパフォーマンス問題が確認された場合に適用する。

## useMemo の使用規約

### 使用すべき場面

- 計算コストが高い処理（複雑な数値計算、大量のデータ処理など）
- レンダリング毎に同じ結果が予想される処理
- 依存する値が頻繁に変更されない場合
- オブジェクトや配列の参照等価性を保持したい場合

### 避けるべき場面

- 単純な算数計算や文字列結合などの軽量な処理
- 依存配列の要素が毎回変更される場合
- プリミティブ値の単純な計算

### 記述例

```typescript
// ✅ 良い例：高コストな計算をメモ化
const expensiveValue = useMemo(() => {
  return items.reduce((sum, item) => sum + item.value * multiplier, 0);
}, [items, multiplier]);

// ❌ 悪い例：単純な計算をメモ化
const simpleSum = useMemo(() => a + b, [a, b]);
// 修正：const simpleSum = a + b;
```

## useCallback の使用規約

### 使用すべき場面

- React.memo でメモ化された子コンポーネントに props として関数を渡す場合
- 他の useCallback、useMemo、useEffect の依存配列に関数を含める場合
- コンテキスト API で関数を提供する場合

### 記述例

```typescript
// ✅ 良い例：React.memoと組み合わせ
const handleClick = useCallback(() => {
  setCount((prevCount) => prevCount + 1);
}, []);

const MemoizedChild = memo(({ onClick }) => (
  <button onClick={onClick}>クリック</button>
));

// ❌ 悪い例：メモ化されていない子コンポーネントで使用
const handleClick = useCallback(() => {
  setCount(count + 1);
}, [count]);

const RegularChild = (
  { onClick } // memoされていない
) => <button onClick={onClick}>クリック</button>;
```

## 依存配列の規約

### 基本原則

- 依存配列は可能な限りシンプルに保つ
- 安定した値のみを含める
- オブジェクトや配列を毎回新しく作成して含めることを避ける

### 記述例

```typescript
// ✅ 良い例：安定した依存関係
const filteredItems = useMemo(() => {
  return items.filter((item) => item.active);
}, [items]); // itemsの参照のみ

// ❌ 悪い例：不安定な依存関係
const filteredItems = useMemo(() => {
  return items.filter((item) => item.active);
}, [{ items }]); // 毎回新しいオブジェクト
```

## パフォーマンス測定の規約

### 測定方法

- React DevTools Profiler を使用
- console.time/console.timeEnd で処理時間を測定
- 実際のユーザー環境でのテストを実施

### 記述例

```typescript
const expensiveValue = useMemo(() => {
  console.time("expensiveCalculation");
  const result = heavyCalculation(data);
  console.timeEnd("expensiveCalculation");
  return result;
}, [data]);
```

## コンポーネント名の規約

### React.memo 使用時の命名

- displayName を明示的に設定する
- function 宣言を使用して名前を明確にする

```typescript
// ✅ 良い例
const MemoizedComponent = memo(function MemoizedComponent({ prop }) {
  return <div>{prop}</div>;
});

// ❌ 悪い例
const MemoizedComponent = memo(({ prop }) => {
  return <div>{prop}</div>;
});
```

## 文体とコメントの規約

### 文体

- 教材では「である調」を使用
- 技術的な説明は正確で簡潔に

### コメント

- メモ化の理由を明記
- 依存配列の意図を説明
- パフォーマンス測定結果があれば記載

```typescript
// 高コストな計算をメモ化：約100msの処理時間を削減
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data.id]); // data.idが変更された時のみ再計算
```

## 実装時のチェックリスト

- [ ] 実際にパフォーマンス問題があるか確認した
- [ ] 依存配列が適切に設定されている
- [ ] メモ化のコストが元の処理より低い
- [ ] React DevTools で効果を確認した
- [ ] 適切なコメントが記載されている
