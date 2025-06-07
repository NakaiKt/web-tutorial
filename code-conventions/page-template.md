# ページテンプレートの適用

## 概要

各セクションのページには、適切なテンプレートを適用する必要がある。

## BaseTemplate

### 適用対象

- `/pages/base/` 配下の全ページ
- 基本的な CSS、HTML、レイアウトに関するコンテンツ

### 使用方法

```tsx
import [ContentComponent] from "@/contents/Base/[ContentName]";
import { BaseTemplate } from "@/features/Template";

const Pages = () => {
  return (
    <BaseTemplate title="[ページタイトル]">
      <[ContentComponent] />
    </BaseTemplate>
  );
};

export default Pages;
```

### 提供される機能

- 統一されたレイアウト（720px 幅のコンテナ）
- 自動目次生成（TableOfContents）
- 見出し構造の自動抽出（h2, h3, h4）
- 検索時のハイライト機能
- フィードバックボタン
- ダークモード対応

## 新しいページ作成時のチェックリスト

1. **コンテンツファイルの作成**

   - `src/contents/Base/[PageName]/index.tsx`

2. **ページファイルの作成**

   - `src/pages/base/[page-name]/index.tsx`
   - 必ず BaseTemplate を適用

3. **サイドメニューへの追加**

   - `src/features/SideMenu/index.tsx`
   - 適切なアイコンとパスを設定

4. **見出し構造の確認**
   - Typography variant="h2", "h3", "h4"を適切に使用
   - id 属性を設定（目次生成のため）

## 注意点

- テンプレートの適用を忘れると、レイアウトが崩れる
- title プロパティはページの h1 として表示される
- コンテンツ内で h1 を使用しない（テンプレートが提供するため）
