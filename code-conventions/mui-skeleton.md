# MUI Skeleton コンポーネント規約

## 概要

Skeleton コンポーネントは UI/UX の向上を目的としたローディング状態の表現に使用するコンポーネントです。

> **注意**: 全体のドキュメント作成規約については [`documentation-guidelines.md`](./documentation-guidelines.md) を参照してください。

## 基本原則

### 1. 適切な Variant の選択

```tsx
// ✅ 良い例：用途に応じたvariantの使用
<Skeleton variant="text" />           // テキスト用
<Skeleton variant="circular" />       // アバター、アイコン用
<Skeleton variant="rectangular" />    // 画像、カード用
<Skeleton variant="rounded" />        // 角丸要素用

// ❌ 悪い例：用途に合わないvariant
<Skeleton variant="rectangular" />    // テキスト表示用として使用
```

### 2. サイズの一貫性

```tsx
// ✅ 良い例：実際のコンテンツと同じサイズ
{
  loading ? (
    <Skeleton variant="rectangular" width={210} height={118} />
  ) : (
    <img width={210} height={118} src={imageSrc} alt="画像" />
  );
}

// ❌ 悪い例：実際のコンテンツとサイズが異なる
{
  loading ? (
    <Skeleton variant="rectangular" width={100} height={50} />
  ) : (
    <img width={210} height={118} src={imageSrc} alt="画像" />
  );
}
```

### 3. アニメーションの使い分け

```tsx
// ✅ 良い例：用途に応じたアニメーション
<Skeleton animation="pulse" />    // 一般的な用途（デフォルト）
<Skeleton animation="wave" />     // 注意を引きたい場合
<Skeleton animation={false} />    // パフォーマンス重視、多数表示時

// ❌ 悪い例：過度なアニメーション
// 大量のリスト表示でwaveアニメーションを使用
{items.map((_, index) => (
  <Skeleton key={index} animation="wave" />  // パフォーマンスに悪影響
))}
```

## 実装パターン

### 1. 条件分岐パターン

```tsx
// ✅ 推奨パターン
{
  loading ? <Skeleton variant="text" /> : <Typography>{data.title}</Typography>;
}
```

### 2. 寸法推測パターン

```tsx
// ✅ Typographyでの推奨パターン
<Typography variant="h1">{loading ? <Skeleton /> : data.title}</Typography>;

// ✅ variant と component の組み合わせでの自動サイズ調整
<Typography variant="h1" component="p">
  {loading ? <Skeleton /> : "h1のスタイルサイズのp要素"}
</Typography>

// ✅ Avatarでの推奨パターン
{
  loading ? (
    <Skeleton variant="circular">
      <Avatar />
    </Skeleton>
  ) : (
    <Avatar src={user.avatar} />
  );
}

// ✅ コンテナ要素での自動サイズ継承
<Box sx={{ fontSize: '1.5rem' }}>
  {loading ? <Skeleton /> : "font-sizeを継承"}
</Box>

// ✅ Flexレイアウトでの自動調整
<Box sx={{ display: 'flex', gap: 2 }}>
  <Box sx={{ flex: 1 }}>
    {loading ? <Skeleton /> : "自動幅調整"}
  </Box>
</Box>
```

**重要な仕組み：**

- Skeleton は親要素の CSS `font-size` を高さの基準として使用
- Typography の `variant` スタイルは `component` に関係なく継承される
- 明示的な width/height 指定は継承より優先される
- Flexbox や CSS Grid などのレイアウトシステムとも連携する

### 3. 複数行テキストパターン

```tsx
// ✅ 複数行テキストの表現
{
  loading ? (
    <>
      <Skeleton />
      <Skeleton />
      <Skeleton width="60%" />
    </>
  ) : (
    <Typography>{data.description}</Typography>
  );
}
```

### 4. ドキュメント例での HTML 構造の配慮

```tsx
// ✅ 良い例：見出しvariantを例として使用する際は component="span" を指定
<Typography variant="h1" component="span">
  {loading ? <Skeleton /> : "例：h1サイズのspan要素"}
</Typography>

<Typography variant="h3" component="span">
  {loading ? <Skeleton /> : "例：h3サイズのspan要素"}
</Typography>

// ❌ 悪い例：見出しvariantをそのまま使用
<Typography variant="h1">
  {loading ? <Skeleton /> : "例：h1タイトル"}  // HTMLのh1要素になってしまう
</Typography>

// 📝 理由：ドキュメントの例として見出しvariantを使用する場合、
//        HTMLの意味的構造（セマンティクス）を崩さないよう配慮が必要
```

### 5. 構造の一貫性を保つ実装パターン

```tsx
// ✅ 推奨：同じコンテナ内でコンテンツのみ置き換え
<Typography variant="h5">
  {loading ? <Skeleton /> : title}
</Typography>

<Box sx={{ display: 'flex', alignItems: 'center' }}>
  {loading ? (
    <Skeleton variant="circular" width={40} height={40} />
  ) : (
    <Avatar src={avatar} />
  )}
  <Typography sx={{ marginLeft: 2 }}>
    {loading ? <Skeleton width="60%" /> : userName}
  </Typography>
</Box>

// ❌ 非推奨：構造を完全に分離
{loading ? (
  <Box>
    <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
    <Box sx={{ display: 'flex' }}>
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="text" width="60%" />
    </Box>
  </Box>
) : (
  <Box>
    <Typography variant="h5">{title}</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Avatar src={avatar} />
      <Typography sx={{ marginLeft: 2 }}>{userName}</Typography>
    </Box>
  </Box>
)}
```

**理由：**

- DRY 原則に従い、レイアウト構造の重複を避ける
- スタイリングの一貫性が保たれる
- 保守性が向上する（レイアウト変更時に一箇所のみ修正）
- Skeleton の自動サイズ継承機能を最大限活用できる

## カスタマイズ規約

### 1. テーマ対応

```tsx
// ✅ ダークテーマ対応
<Skeleton
  sx={{ bgcolor: theme.palette.mode === "dark" ? "grey.700" : "grey.300" }}
  variant="rectangular"
  width={210}
  height={118}
/>
```

### 2. レスポンシブ対応

```tsx
// ✅ レスポンシブサイズ
<Skeleton
  variant="rectangular"
  sx={{
    width: { xs: "100%", sm: 300 },
    height: { xs: 200, sm: 150 },
  }}
/>
```

## パフォーマンス考慮事項

### 1. 大量表示時の最適化

```tsx
// ✅ パフォーマンス最適化
{
  items.map((_, index) => (
    <Skeleton
      key={index}
      animation={false} // アニメーションを無効化
      variant="text"
    />
  ));
}
```

### 2. メモ化の活用

```tsx
// ✅ React.memoでの最適化
const SkeletonItem = memo(() => (
  <Skeleton variant="rectangular" width={210} height={118} />
));
```

## アクセシビリティ

### 1. ARIA ラベル

```tsx
// ℹ️ Skeletonはフォーカス不可のため、ARIAラベルは通常不要
// ただし、読み込み状態を明示したい場合は親要素に追加

<Box aria-label="コンテンツを読み込み中">
  <Skeleton variant="text" />
</Box>
```

### 2. スクリーンリーダー対応

```tsx
// ✅ 読み込み状態の明示
<Box role="status" aria-live="polite">
  {loading ? (
    <>
      <span className="sr-only">読み込み中...</span>
      <Skeleton variant="text" />
    </>
  ) : (
    <Typography>{data.content}</Typography>
  )}
</Box>
```

## 使用を避けるべきケース

### 1. 不適切な使用例

```tsx
// ❌ 避けるべき：エラー状態での使用
{
  error ? (
    <Skeleton variant="text" /> // エラー時はSkeletonではなくエラーメッセージを表示
  ) : (
    <Typography>{data.title}</Typography>
  );
}

// ❌ 避けるべき：静的コンテンツでの使用
<Skeleton variant="text" />; // 常に同じコンテンツが表示される場合は不要

// ❌ 避けるべき：過度に長い読み込み時間
// 10秒以上の読み込み時間の場合は、プログレスバーなどの代替手段を検討
```

## まとめ

- **目的を明確に**：ユーザー体験の向上が目的
- **一貫性を保つ**：実際のコンテンツとサイズ・形状を合わせる
- **パフォーマンスを考慮**：大量表示時はアニメーションを制御
- **アクセシビリティ**：読み込み状態を適切に伝える

## 関連規約

- [ドキュメント作成規約](./documentation-guidelines.md) - 全体のドキュメント作成ルール
- [MUI 全般規約](./mui-general.md) - MUI コンポーネント共通のルール
