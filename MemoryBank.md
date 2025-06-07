# MemoryBank - 学習と実装の記録

## TableOfContents（目次機能）実装 - 2024

### 概要

画面右端にホバー表示される目次機能を実装。現在地の自動認識、スムーススクロール、ネスト構造表示を含む。

### 重要な技術的知見

#### 1. React 要素解析 vs DOM 走査

**課題**: React 要素（JSX）から見出しを抽出しようとしたが、複雑すぎて失敗
**解決**: DOM 走査（`document.querySelectorAll`）に変更
**学習**:

- React 要素の解析は`cloneElement`や再帰処理が必要で複雑
- レンダリング後の DOM から直接取得する方が確実でシンプル
- `children`として渡されるのはコンポーネント関数であり、中身へのアクセスが困難

```typescript
// ❌ 複雑だった方法
const extractHeadings = (children: ReactNode) => {
  // React要素の再帰解析...
};

// ✅ シンプルな解決策
const extractHeadingsFromDOM = (): Heading[] => {
  const headingElements = document.querySelectorAll("h2, h3, h4");
  // ...
};
```

#### 2. IntersectionObserver による現在地検出

**実装**: 画面表示中の見出しを自動検出して目次で強調表示
**キーポイント**:

- `rootMargin: '-5% 0px -70% 0px'` で画面上部 5%での判定
- スクロール位置とクリック時の到達位置を一致させることが重要

```typescript
const observer = new IntersectionObserver(
  (entries) => {
    const visibleHeadings = entries
      .filter((entry) => entry.isIntersecting)
      .map((entry) => entry.target.id);
    if (visibleHeadings.length > 0) {
      setActiveHeadingId(visibleHeadings[0]);
    }
  },
  { rootMargin: "-5% 0px -70% 0px", threshold: 0 }
);
```

#### 3. スムーススクロールの距離別速度調整

**要求**: 近距離は瞬間移動、遠距離は適度な速度
**実装**: 段階的速度システム

```typescript
const calculateScrollDuration = (distance: number): number => {
  if (distance <= 500) {
    return distance / 50; // 近距離：超高速
  } else {
    return 100 + (distance - 500) / 3; // 遠距離：適度な速度
  }
};
```

#### 4. MUI スタイルの統一パターン

**学習**: SideMenu と TableOfContents でホバー効果を統一

```typescript
'&:hover': {
  bgcolor: 'primary.light',
  color: 'inherit',
}
```

### 設計パターン

#### 1. 定数の抽出

```typescript
const HOVER_DELAY = 100;
const VIEWPORT_OFFSET = 0.05;
const DISTANCE_THRESHOLD = 500;
```

**利点**: 設定変更が容易、マジックナンバーの排除

#### 2. 関数の単一責任化

- `calculateScrollDuration` - スクロール時間計算専用
- `getIndentLevel` - インデント計算専用
- `renderHeadingItem` - 項目レンダリング専用

#### 3. TypeScript 活用

```typescript
export type Heading = {
  id: string;
  label: string;
  level: 2 | 3 | 4; // Union型で制限
};
```

### 実装で学んだベストプラクティス

1. **DOM 操作のタイミング**: `useEffect`内で`setTimeout`を使用してレンダリング後に実行
2. **メモリリーク防止**: `observer.disconnect()`, `clearTimeout()`の確実な実行
3. **レスポンシブ対応**: `window.innerHeight * 0.05`で画面サイズに応じた調整
4. **ユーザビリティ**: ホバー終了に 100ms の遅延を設けてマウス移動の誤動作を防止

### 今後の参考事項

- 複雑な React 要素解析より DOM クエリの方が適切な場合がある
- IntersectionObserver は現在位置検出の標準的な手法
- MUI の`sx`prop での動的スタイリングパターン
- スムーススクロールは`requestAnimationFrame`が標準

## 色（Color）コンテンツ実装 - 2025 年 5 月

### 概要

基本項目として「色」についてのコンテンツを実装。Tailwind と MUI の色指定方法を詳細に解説し、アクセシビリティやベストプラクティスも包括的にカバー。

### 重要な技術的知見

#### 1. Tailwind vs MUI 色指定の特徴理解

**Tailwind CSS**:

- `text-{color}-{shade}` の直感的なクラス名
- 50〜950 の明度指定で細かい調整が可能
- HTML に直接記述できる手軽さ

**MUI**:

- テーマパレット（primary, secondary, error など）による統一管理
- `text.primary`、`text.secondary`、`text.disabled` の階層構造
- `background.default`、`background.paper` の適切な使い分け

#### 2. アクセシビリティの重要性

**コントラスト比の基準**:

- 通常テキスト: 4.5:1 以上
- 大きいテキスト: 3:1 以上

**色覚多様性への配慮**:

- 色だけでなく形状・アイコン・テキストで情報補完
- 成功=緑、警告=黄・オレンジ、エラー=赤、情報=青の統一

#### 3. 実装時の学習ポイント

**口調の統一**:

- 他のコンテンツと同様に「である」調で記述
- 学習者への説明として詳細かつ具体的に

**コード例の充実**:

- 良い例（✅）と悪い例（❌）の対比
- 実用的な組み合わせパターンの提示
- Tailwind と MUI の併用例

### メニュー構造への追加

- SideMenu の基本項目の最上位に「色」を追加
- Palette アイコンを使用（視覚的に分かりやすい）
- SearchTypography の pathMapping にも対応

### SearchTypography 機能の改善 - 2025 年 5 月 31 日

#### Skeleton 項目の追加

**課題**: SearchTypography の検索対象に Skeleton コンテンツが含まれていなかった
**解決**: `pathMapping.ts`に Skeleton 項目を追加

```typescript
"Mui/Skeleton/index.tsx": {
  title: "Skeleton",
  section: "MUI",
  url: "/mui/skeleton",
  displayName: "MUI > Skeleton",
},
```

**学習ポイント**:

- 新しいコンテンツページを追加した際は、SearchTypography の pathMapping も更新が必要
- 検索機能の対象範囲を常に最新に保つことでユーザビリティが向上

#### コード規約の拡充

**Skeleton コンポーネント規約を追加**:

- 適切な variant 選択（text, circular, rectangular, rounded）
- 実際のコンテンツとのサイズ一致の重要性
- コンテンツ構造の維持（コンテナを変更せずコンテンツのみ置き換え）
- ダークテーマ対応とアニメーション制御

## 最新の実装記録

### 2025 年 6 月 1 日 - 色コンテンツの改善完了

**実装内容：**

1. **テキスト色指定の視覚的改善**

   - color と shade の差分を視覚的に表示
   - Box コンポーネントを使った背景色での見やすさ向上
   - コントラスト比を明示したデモンストレーション

2. **MUI の color[shade]記法の追加説明**

   - `primary.light`, `error[700]`などの記法説明
   - 視覚的なデモンストレーション付き
   - `sx`プロパティでの使用例

3. **アクセシビリティの強化**

   - 具体的なコントラスト比を表示
   - 良い例・悪い例の視覚的比較
   - WCAG 準拠の説明

4. **テーマカスタマイズで CodeBlock コンポーネント使用**
   - プレビューなしの CodeBlock コンポーネントを採用
   - TypeScript コードの詳細な説明
   - カスタマイズポイントの解説

**技術的改善点：**

- Box + className の組み合わせで Tailwind 色と MUI 背景色を併用
- コントラスト比の数値を明示して教育効果向上
- カラーバリエーションの体系的な説明

**学習効果：**

- 色の明度とシェードの関係が直感的に理解できる
- アクセシビリティの重要性を具体例で説明
- 実用的なコード例による実践的学習

## React Memoization 教材の統合実装 - 2024

### 概要

useCallback と useMemo の個別教材を「Memoization」として統合し、包括的な教材を作成。基本概念から実践的な使い方、パフォーマンス最適化のベストプラクティスまでを網羅。

### 重要な設計判断

#### 1. 教材の統合アプローチ

**判断**: useCallback と useMemo を個別ではなく、「Memoization」として統合
**理由**:

- 2 つの概念は密接に関連しており、一緒に学習する方が理解しやすい
- React.memo との組み合わせを含めた包括的な理解が重要
- 実際の開発では両方を組み合わせて使用するケースが多い

#### 2. 実践的な内容構成

**構成**:

1. 基本概念の解説
2. useMemo 詳細
3. useCallback 詳細
4. いつ使うべきか
5. いつ使わないべきか
6. 再生成のタイミング
7. 不要な再生成の問題
8. 高度な内容（切り替え可能）

**学習**: 「いつ使わないべきか」の解説が特に重要。早期最適化の落とし穴を明確に説明。

#### 3. インタラクティブなデモ実装

**実装**: 実際に動作するコード例とコンソールログ出力
**効果**: メモ化の動作を視覚的に確認できる

```typescript
const expensiveValue = useMemo(() => {
  console.log("useMemo: 高コストな計算を実行中...");
  // 実際の計算処理
  return result;
}, [items, multiplier]);
```

#### 4. コンポーネント名の問題解決

**問題**: React.memo で displayName が不足
**解決**: function 宣言を使用してコンポーネント名を明示

```typescript
// ✅ 修正後
const MemoizedChild = memo(function MemoizedChild({ onClick }) {
  return <button onClick={onClick}>ボタン</button>;
});
```

### 文体と解説の工夫

#### 1. 「である調」の統一

**方針**: 教材全体で「である調」を使用し、技術文書として統一感を保つ
**効果**: 説明的な文体により、学習者が集中しやすい環境を作成

#### 2. 具体例とアンチパターンの対比

**手法**: ✅ 良い例と ❌ 悪い例を明確に分けて表示
**学習効果**: 何をすべきで何を避けるべきかが明確

#### 3. パフォーマンス測定の実例

**内容**: React DevTools や console.time を使った実際の測定方法を紹介
**重要性**: 理論だけでなく、実際に効果を確認する方法を提供

### コード規約の整備

- `code-conventions/react-memoization.md` を新規作成
- 使用すべき場面と避けるべき場面を明確化
- 依存配列の適切な設定方法を規約化
- パフォーマンス測定のベストプラクティスを文書化

### 今後の改善点

- より多くの実践的な例の追加
- エラーの処理パターンの解説
- カスタムフックでのメモ化パターン
- 他の最適化手法との比較
