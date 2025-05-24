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
