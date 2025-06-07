# MUI 全般コンポーネント規約

このファイルは、MUI コンポーネント全般に適用される共通の規約です。

## 1. 基本原則

### 1.1 MUI コンポーネント優先の原則

- HTML の基本要素（`<input>`, `<button>`, `<div>`など）よりも MUI コンポーネントを優先使用する
- カスタムスタイルよりも MUI の設計システムを活用する
- テーマ対応やアクセシビリティの恩恵を受けるため

```tsx
// ❌ 避ける：HTMLの基本要素
<input
  style={{ padding: "8px", border: "1px solid #ccc" }}
  placeholder="検索..."
/>
<button
  style={{ backgroundColor: "#1976d2", color: "white" }}
  onClick={handleClick}
>
  送信
</button>

// ✅ 推奨：MUIコンポーネント
<TextField
  placeholder="検索..."
  size="small"
/>
<Button
  variant="contained"
  onClick={handleClick}
>
  送信
</Button>
```

### 1.2 適切なバリアント選択

- 各コンポーネントの用途に応じたバリアントを選択する
- デフォルトバリアントの特性を理解する
- カスタムバリアントが必要な場合はテーマで定義する

### 1.3 よく使用するコンポーネントの使い分け

#### フォーム要素

- **TextField**: 入力フィールド全般（text, email, password など）
- **Button**: ボタン要素（variant: contained, outlined, text）
- **Checkbox, Radio, Switch**: 選択要素

#### レイアウト

- **Box**: div の代替、flexbox やグリッドレイアウト
- **Paper**: カード型のコンテナ
- **Container**: ページ幅制限付きコンテナ

#### 表示

- **Typography**: テキスト表示（variant で見出しレベル指定）
- **Alert**: 通知・警告メッセージ
- **Divider**: 区切り線

```tsx
// ✅ 推奨：適切なコンポーネント選択
<Box sx={{ display: 'flex', gap: 1 }}>
  <TextField variant="outlined" size="small" />
  <Button variant="contained" size="small">
    実行
  </Button>
</Box>

<Typography variant="h2">見出し</Typography>
<Typography variant="body1">本文テキスト</Typography>
```

### 1.4 一貫性の維持

- 同じ用途には同じスタイリング方法を使用する
- プロジェクト全体でコンポーネントの使い方を統一する
- 色、サイズ、間隔などの値をテーマで管理する

### 1.3 パフォーマンス最適化

- 大量表示時のレンダリング最適化を考慮する
- 不要な再レンダリングを避ける
- メモ化（React.memo、useMemo、useCallback）の適切な使用

### 1.4 レイアウトコンポーネントの使い分け

#### 基本レイアウト

- **Box**: 基本的なコンテナ（`<div>`の代替）
- **Typography**: テキスト表示（`<p>`, `<h1>`, `<span>`の代替）
- **Stack**: 要素の配置（flexbox を簡単に扱う）
- **Grid**: 複雑なレイアウト（グリッドシステム）

```tsx
// ❌ 避ける：HTMLの基本要素
<div className="container">
  <p>タイトル</p>
  <div className="content">
    <p>内容</p>
  </div>
</div>

// ✅ 推奨：MUIコンポーネント
<Box sx={{ p: 2 }}>
  <Typography variant="h6">タイトル</Typography>
  <Box sx={{ mt: 2 }}>
    <Typography>内容</Typography>
  </Box>
</Box>
```

#### 表示・フィードバック

- **Paper**: 境界線のある背景（カード風の表示）
- **Alert**: 通知・警告メッセージ
- **Divider**: 区切り線（`<hr>`の代替）
- **Chip**: ラベル・タグ表示

```tsx
// ❌ 避ける：カスタムスタイル
<div style={{
  backgroundColor: "#f5f5f5",
  padding: "16px",
  borderRadius: "4px"
}}>
  <p style={{ color: "#1976d2" }}>情報</p>
</div>

// ✅ 推奨：MUIコンポーネント
<Alert severity="info">
  情報
</Alert>
```

### 1.5 適用優先度

新しくコンポーネントを作成する場合や既存のコードを修正する場合は、以下の優先度でコンポーネントを選択する：

1. **MUI コンポーネント**（第一優先）
2. **カスタムコンポーネント**（MUI をベースにした拡張）
3. **HTML の基本要素**（MUI で対応できない特殊な場合のみ）

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

## 3. 色（Color）使用規約

### 3.1 パレットカラーの基本原則

```tsx
// ✅ 推奨：テーマパレットの使用
<Typography color="primary.main">メインカラー</Typography>
<Typography color="text.secondary">サブテキスト</Typography>
<Box sx={{ bgcolor: 'background.paper' }}>コンテンツ</Box>

// ❌ 避ける：直接の色値指定
<Typography sx={{ color: '#1976d2' }}>避けるべき</Typography>
```

### 3.2 色の一貫性

- **primary**: ブランドの主要色、重要なアクション
- **secondary**: 補助的な色、セカンダリアクション
- **error**: エラー状態、削除などの危険なアクション
- **warning**: 警告状態、注意が必要な情報
- **info**: 情報表示、ヘルプテキスト
- **success**: 成功状態、完了メッセージ

### 3.3 テキストカラーの階層

```tsx
// ✅ 推奨：適切な階層表現
<Typography color="text.primary">最重要テキスト</Typography>
<Typography color="text.secondary">補足テキスト</Typography>
<Typography color="text.disabled">無効状態テキスト</Typography>
```

### 3.4 背景色の使い分け

```tsx
// ✅ 推奨：適切な背景色選択
<Box sx={{ bgcolor: 'background.default' }}>画面全体の背景</Box>
<Paper sx={{ bgcolor: 'background.paper' }}>カード・パネル背景</Paper>
<Box sx={{ bgcolor: 'primary.light' }}>アクセント背景</Box>
```

## 4. アクセシビリティ規約

### 4.1 必須の ARIA 属性

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

### 4.2 キーボードナビゲーション

- すべてのインタラクティブ要素がキーボードでアクセス可能
- 適切なフォーカス順序の設定
- ESC キーや Enter キーの適切な処理

### 4.3 スクリーンリーダー対応

- 意味のあるラベルの提供
- 状態変化の通知
- 適切な見出し構造の維持

## 5. TypeScript との連携

### 5.1 型安全性の確保

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

### 5.2 プロパティの型チェック

- 必須プロパティの明確化
- オプショナルプロパティのデフォルト値設定
- Union 型を使用した制限的な選択肢の提供

## 6. パフォーマンス考慮事項

### 6.1 大量データの処理

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

### 6.2 レンダリング最適化

- 条件付きレンダリングの最適化
- 状態更新の最小化
- 不要なエフェクトの削除

## 7. エラーハンドリング

### 7.1 境界エラーハンドリング

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

### 7.2 非同期エラーの処理

- try-catch 文の適切な使用
- Promise rejection の処理
- ユーザーへの適切なエラー通知

## 8. テスト可能性

### 8.1 テスト ID の設定

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

### 8.2 コンポーネントの分離

- 単一責任の原則に従う
- 依存関係の最小化
- モックしやすい設計

## 9. 国際化 (i18n) 対応

### 9.1 テキストの外部化

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

### 9.2 文化的配慮

- 日付・時刻フォーマットの地域対応
- 数値フォーマットの地域対応
- 色や画像の文化的意味の考慮

## 10. Skeleton（スケルトン）使用規約

### 10.1 適切な variant の選択

```tsx
// ✅ 推奨：用途に応じたvariant使用
<Skeleton variant="text" sx={{ fontSize: '1rem' }} />     // テキスト用
<Skeleton variant="circular" width={40} height={40} />     // アバター用
<Skeleton variant="rectangular" width={210} height={118} /> // 画像・カード用
<Skeleton variant="rounded" width={100} height={50} />     // 角丸要素用

// ❌ 避ける：用途に合わないvariant
<Skeleton variant="rectangular" />  // テキスト用として使用は不適切
```

### 10.2 実際のコンテンツとのサイズ一致

```tsx
// ✅ 推奨：実際のコンテンツと同じサイズ
{
  loading ? (
    <Skeleton variant="rectangular" width={210} height={118} />
  ) : (
    <img width={210} height={118} src={imageSrc} alt="画像" />
  );
}

// ✅ 推奨：Typography用のSkeletonサイズ調整
<Typography variant="h1" component="span">
  {loading ? <Skeleton /> : "タイトル"}
</Typography>;
```

### 10.3 コンテンツ構造の維持

```tsx
// ✅ 推奨：同じコンテナ内でコンテンツのみを置き換え
<Box>
  <Typography variant="h5">{loading ? <Skeleton /> : title}</Typography>
  <Typography>{loading ? <Skeleton /> : description}</Typography>
  <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
    {loading ? (
      <Skeleton variant="circular" width={40} height={40} />
    ) : (
      <Avatar src={avatar} />
    )}
    <Box sx={{ ml: 2 }}>
      <Typography variant="body2">
        {loading ? <Skeleton width="40%" /> : userName}
      </Typography>
    </Box>
  </Box>
</Box>;

// ❌ 避ける：コンテナ構造の変更
{
  loading ? <Skeleton /> : <CompleteComponent />;
}
```

### 10.4 テーマ対応とカスタマイズ

```tsx
// ✅ 推奨：ダークテーマ対応
<Skeleton
  sx={{ bgcolor: 'grey.700' }}  // ダークモード時の調整
  variant="rectangular"
  width={210}
  height={60}
/>

// ✅ 推奨：アニメーションの制御
<Skeleton animation="pulse" />    // デフォルト
<Skeleton animation="wave" />     // 注意を引きたい場合
<Skeleton animation={false} />    // アニメーション無効
```

# MUI 色使用に関する規約

## 1. 基本的な色指定方法

### 1.1 パレットカラーの使用

- `primary`, `secondary`, `error`, `warning`, `info`, `success` の 6 つの基本色を使用
- 各色には `main`, `light`, `dark`, `contrastText` のバリアントが用意されている

### 1.2 color[shade]記法の使用

- MUI では `color[shade]` 形式で色の明度を指定可能
- 例：`primary[500]`, `red[900]`, `blue[200]` など
- `sx` プロパティ内で使用：`sx={{ color: 'primary.main' }}`
- より詳細な色制御が必要な場合に活用

```tsx
// 基本的な使用例
<Typography sx={{ color: 'primary.light' }}>薄いプライマリー色</Typography>
<Typography sx={{ color: 'primary.main' }}>標準プライマリー色</Typography>
<Typography sx={{ color: 'primary.dark' }}>濃いプライマリー色</Typography>

// color[shade]記法の例
<Typography sx={{ color: 'error[700]' }}>エラー色の700番</Typography>
```

## 2. テキストカラーの階層

### 2.1 テキストカラーの使い分け

- `text.primary`: メインテキスト（最も重要な情報）
- `text.secondary`: サブテキスト（補足情報）
- `text.disabled`: 無効なテキスト（非アクティブ状態）

### 2.2 視覚的表現

- Box コンポーネントを使った背景色での差分表示を推奨
- コントラスト比を考慮した文字色選択（WCAG 準拠）
- 色だけでなく、配置や大きさでも情報の重要度を表現

## 3. アクセシビリティ考慮事項

### 3.1 コントラスト比の確保

- 通常テキスト：4.5:1 以上
- 大きいテキスト：3:1 以上
- 具体的なコントラスト比を表示して分かりやすく説明

### 3.2 色覚多様性への配慮

- 色だけでなく、形状やアイコン、テキストも併用
- 一貫した色の意味づけ（成功=緑、エラー=赤など）
