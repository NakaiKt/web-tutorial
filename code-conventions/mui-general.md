# MUI 全般コンポーネント規約

このファイルは、MUI コンポーネント全般に適用される共通の規約です。

## 1. 基本原則

### 1.1 適切なバリアント選択

- 各コンポーネントの用途に応じたバリアントを選択する
- デフォルトバリアントの特性を理解する
- カスタムバリアントが必要な場合はテーマで定義する

### 1.2 一貫性の維持

- 同じ用途には同じスタイリング方法を使用する
- プロジェクト全体でコンポーネントの使い方を統一する
- 色、サイズ、間隔などの値をテーマで管理する

### 1.3 パフォーマンス最適化

- 大量表示時のレンダリング最適化を考慮する
- 不要な再レンダリングを避ける
- メモ化（React.memo、useMemo、useCallback）の適切な使用

## 2. スタイリング規約

### 2.1 sx プロパティの使用

```tsx
// ✅ 推奨：シンプルなスタイリング
<Component sx={{ margin: 2, padding: 1 }} />

// ✅ 推奨：レスポンシブ対応
<Component
  sx={{
    width: { xs: '100%', sm: 300 },
    height: { xs: 200, sm: 150 }
  }}
/>

// ✅ 推奨：テーマ値の使用
<Component
  sx={{
    color: 'primary.main',
    bgcolor: 'background.paper',
    borderRadius: 1
  }}
/>

// ❌ 避ける：複雑すぎるsx
<Component sx={{
  // 10行以上の複雑なスタイル
  // この場合はstyledコンポーネントやテーマを使用
}} />
```

### 2.2 テーマとの連携

```tsx
// ✅ 推奨：テーマ値の活用
sx={{
  bgcolor: theme.palette.mode === 'dark' ? 'grey.700' : 'grey.300',
  color: 'text.primary',
  spacing: theme.spacing(2)
}}

// ✅ 推奨：テーマブレークポイントの使用
sx={{
  display: { xs: 'block', md: 'flex' },
  width: { xs: '100%', md: 'auto' }
}}
```

## 3. アクセシビリティ規約

### 3.1 必須の ARIA 属性

```tsx
// ✅ フォーカス可能な要素
<Button
  aria-label="メニューを開く"
  aria-expanded={open}
  aria-controls="menu-list"
>

// ✅ 状態を表す要素
<Box
  role="status"
  aria-live="polite"
  aria-label="読み込み中"
>

// ✅ ナビゲーション要素
<Box component="nav" aria-label="メインナビゲーション">
```

### 3.2 キーボードナビゲーション

- すべてのインタラクティブ要素がキーボードでアクセス可能
- 適切なフォーカス順序の設定
- ESC キーや Enter キーの適切な処理

### 3.3 スクリーンリーダー対応

- 意味のあるラベルの提供
- 状態変化の通知
- 適切な見出し構造の維持

## 4. TypeScript との連携

### 4.1 型安全性の確保

```tsx
// ✅ 推奨：適切な型定義
interface ButtonProps {
  variant?: "primary" | "secondary" | "outlined";
  size?: "small" | "medium" | "large";
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

// ✅ 推奨：MUIの型の拡張
declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
  }
}
```

### 4.2 プロパティの型チェック

- 必須プロパティの明確化
- オプショナルプロパティのデフォルト値設定
- Union 型を使用した制限的な選択肢の提供

## 5. パフォーマンス考慮事項

### 5.1 大量データの処理

```tsx
// ✅ 推奨：仮想化の使用
import { FixedSizeList } from "react-window";

// ✅ 推奨：メモ化の活用
const MemoizedListItem = memo(({ item }) => <ListItem>{item.name}</ListItem>);

// ✅ 推奨：適切なkey属性
{
  items.map((item) => <MemoizedListItem key={item.id} item={item} />);
}
```

### 5.2 レンダリング最適化

- 条件付きレンダリングの最適化
- 状態更新の最小化
- 不要なエフェクトの削除

## 6. エラーハンドリング

### 6.1 境界エラーハンドリング

```tsx
// ✅ 推奨：ErrorBoundaryの使用
<ErrorBoundary fallback={<ErrorDisplay />}>
  <ComplexComponent />
</ErrorBoundary>;

// ✅ 推奨：適切なエラー表示
{
  error && (
    <Alert severity="error" sx={{ mt: 2 }}>
      {error.message}
    </Alert>
  );
}
```

### 6.2 非同期エラーの処理

- try-catch 文の適切な使用
- Promise rejection の処理
- ユーザーへの適切なエラー通知

## 7. テスト可能性

### 7.1 テスト ID の設定

```tsx
// ✅ 推奨：data-testid の使用
<Button data-testid="submit-button">
  送信
</Button>

// ✅ 推奨：role属性の活用
<Box role="button" tabIndex={0}>
  カスタムボタン
</Box>
```

### 7.2 コンポーネントの分離

- 単一責任の原則に従う
- 依存関係の最小化
- モックしやすい設計

## 8. 国際化 (i18n) 対応

### 8.1 テキストの外部化

```tsx
// ✅ 推奨：i18nライブラリの使用
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

<Button>{t('common.submit')}</Button>

// ✅ 推奨：RTL対応
<Box sx={{
  textAlign: { direction: 'rtl' } ? 'right' : 'left'
}}>
```

### 8.2 文化的配慮

- 日付・時刻フォーマットの地域対応
- 数値フォーマットの地域対応
- 色や画像の文化的意味の考慮
