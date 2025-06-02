# ダークモード実装規約

## 概要

このプロジェクトでは MUI v7 のテーマシステムを使用してダークモード機能を実装しています。

## アーキテクチャ

### ThemeContext パターン

- `src/contexts/ThemeContext.tsx`で React Context API を使用したテーマ管理
- `ThemeContextProvider`でアプリケーション全体をラップ
- `useThemeMode`カスタムフックでテーマの状態と切り替え関数を提供

### MUI テーマ統合

```typescript
// テーマモードに応じたMUIテーマ作成
const theme = createTheme({
  palette: {
    mode, // 'light' | 'dark'
    // その他のパレット設定
  },
});
```

## UI レイアウト規約

### テーマ切り替えボタンの配置

**原則**: テーマ切り替えボタンは全ページで一貫して右上に固定配置する

**実装場所**: `_app.tsx`でアプリケーション全体のレイアウトとして配置

**スタイル規約**:

```typescript
// 固定位置配置
position: "fixed",
top: 16,
right: 16,
zIndex: 1300, // MUIのAppBarより上

// 視認性向上のための背景
backgroundColor: (theme) =>
  theme.palette.mode === "dark"
    ? "rgba(0, 0, 0, 0.6)"      // ダークモード: 半透明黒
    : "rgba(255, 255, 255, 0.8)", // ライトモード: 半透明白

// ガラス効果とシャドウ
backdropFilter: "blur(8px)",
boxShadow: (theme) =>
  theme.palette.mode === "dark"
    ? "0 4px 6px rgba(0, 0, 0, 0.3)"
    : "0 4px 6px rgba(0, 0, 0, 0.1)",
```

**なぜこの配置か**:

- **アクセシビリティ**: 常に同じ位置にあることで、ユーザーが迷わずテーマを切り替えられる
- **視覚的整合性**: 全ページで統一された UI 体験を提供
- **レスポンシブ対応**: `position: fixed`により、スクロールやページ構造に影響されない

## コンポーネント設計原則

### 1. テーマ対応コンポーネント

テーマに依存するスタイルは以下の方法で実装：

```tsx
// sx prop でテーマ関数を使用
sx={{
  backgroundColor: (theme) => theme.palette.mode === 'dark'
    ? 'rgba(255, 255, 255, 0.1)'
    : 'grey.100',
  color: 'text.primary', // テーマ色を直接参照
}}
```

### 2. 固定モードコンポーネント

`PreviewBlock`のように、ダークモード切り替えの影響を受けないコンポーネント：

```tsx
// Tailwind クラスで明示的に固定色を指定
<div className="bg-gray-300 text-black p-4">
```

### 3. テーマ切り替え UI

- `ThemeToggleButton`は MUI の`IconButton`と`Tooltip`を使用
- アイコンは`Brightness7`（太陽）と`Brightness4`（月）で視覚的に区別
- アクセシビリティ対応として`aria-label`を設定

## パフォーマンス考慮事項

### メモ化

```typescript
// テーマオブジェクトの不要な再作成を防ぐ
const theme = React.useMemo(() => {
  return createTheme({
    palette: { mode },
    // ...
  });
}, [mode]);
```

### ローカルストレージ

- ユーザーの選択したテーマモードを`localStorage`に保存
- ページリロード時に設定を復元

## MUI v7 特有の機能活用

### CssBaseline

```tsx
<ThemeProvider theme={theme}>
  <CssBaseline /> {/* ブラウザデフォルトスタイルのリセット */}
  {children}
</ThemeProvider>
```

### palette.mode

MUI v7 では`palette.mode`を設定するだけで：

- `background.default`, `background.paper`
- `text.primary`, `text.secondary`
- その他の色が自動的にダーク/ライトモードに対応

## 実装時の注意点

1. **ハードコーディングの回避**: 色の値を直接指定せず、テーマの色パレットを使用
2. **コントラスト比の確保**: ダークモード時でも十分な可読性を保つ
3. **一貫性**: アプリケーション全体で統一されたテーマ適用
4. **部分的固定**: 仕様で明示的に「固定」とされた部分は影響を受けないよう実装

## 今後の拡張性

- システム設定に従う「auto」モードの追加
- コンポーネント単位でのテーマカスタマイズ
- カラースキームのプリセット機能
