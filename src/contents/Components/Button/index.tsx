import { Typography, Button } from "@mui/material";
import BulletPoints from "@/components/parts/BulletPoints";
import Space from "@/components/parts/Space";
import Link from "@/components/parts/Link";
import CodePreview from "@/components/parts/CodePreview";
import CodeBlock from "@/components/parts/CodeBlock";

type NormalButtonProps = {
  text?: string;
  onClick?: () => void;
};

export const NormalButton = ({
  text = "デフォルトのボタン",
  onClick = () => {
    alert("デフォルトのボタンがクリックされました");
  },
}: NormalButtonProps) => {
  return <Button onClick={onClick}>{text}</Button>;
};

const ButtonComponent = () => {
  const ButtonConceptList = [
    "ユーザーアクションを実行するためのインタラクティブ要素",
    "クリック、タップ、キーボード操作に反応する",
    "明確なラベルと適切な視覚的フィードバックを提供する",
    "アクセシビリティを考慮した実装が重要",
  ];

  const ButtonVariantsList = [
    "Primary（主要アクション）: 最も重要な操作用",
    "Secondary（副次アクション）: 補助的な操作用",
    "Outlined（輪郭）: 控えめな操作用",
    "Text（テキスト）: 最も控えめな操作用",
  ];

  const ButtonStatesList = [
    "Default（デフォルト）: 通常の状態",
    "Hover（ホバー）: マウスオーバー時の状態",
    "Pressed（押下）: クリック時の状態",
    "Disabled（無効）: 操作不可能な状態",
    "Loading（読み込み）: 処理中の状態",
  ];

  return (
    <div>
      <Typography>
        Buttonは、ユーザーインタラクションにおいて最も基本的で重要なUIコンポーネントです。
        <br />
        適切な設計と実装により、直感的で使いやすいユーザーエクスペリエンスを提供できます。
      </Typography>
      <Typography variant="h2" id="concept">
        Buttonコンポーネントの基本概念
      </Typography>
      <Typography>
        Buttonコンポーネントは、以下の特性を持つ重要なUI要素です：
      </Typography>
      <BulletPoints items={ButtonConceptList} />
      <Typography variant="h3" id="button-variants">
        Buttonのバリエーション（variant）
      </Typography>
      <Typography>
        ボタンには用途に応じて複数のバリエーションが存在します：
      </Typography>
      <BulletPoints items={ButtonVariantsList} />
      <Typography>
        <Typography component="span" sx={{ fontWeight: "bold" }}>
          視覚的階層の原則
        </Typography>
        ：ページ内で最も重要なアクションにはPrimaryを、補助的なアクションにはSecondaryやOutlinedを使用することで、
        ユーザーが直感的に操作の重要度を理解できます。
      </Typography>
      <Typography variant="h3" id="button-states">
        Buttonの状態管理
      </Typography>
      <Typography>
        ボタンは以下の状態を適切に表現する必要があります：
      </Typography>
      <BulletPoints items={ButtonStatesList} />
      <Typography>
        <Typography component="span" sx={{ fontWeight: "bold" }}>
          ユーザビリティの重要性
        </Typography>
        ：各状態が視覚的に明確に区別でき、ユーザーが現在の状態を理解できることが重要です。
        特に、DisabledとLoading状態では、なぜその状態になっているかを適切に伝える必要があります。
      </Typography>
      <Typography variant="h3" id="accessibility">
        アクセシビリティの考慮事項
      </Typography>
      <BulletPoints
        items={[
          "適切なaria-labelやaria-describedbyの設定",
          "キーボードナビゲーション（Tabキー、Enterキー、Spaceキー）への対応",
          "十分なコントラスト比の確保（WCAG AA基準：4.5:1以上）",
          "フォーカス表示の明確化",
          "スクリーンリーダーでの読み上げ対応",
        ]}
      />
      <Typography variant="h2" id="mui-implementation">
        MUI実装
      </Typography>
      <Typography>
        以下では、Material-UIライブラリを使用したButtonコンポーネントの具体的な実装方法を説明します。
      </Typography>
      <Typography variant="h3" id="mui-basic-usage">
        基本的な使用方法
      </Typography>
      <Typography>MUIのButtonコンポーネントの最もシンプルな実装例：</Typography>{" "}
      <CodePreview
        code={`{/* 基本的なボタン */}
<Button variant="contained">クリック</Button>

{/* カスタムハンドラー付きボタン */}
<Button 
  variant="outlined" 
  onClick={() => console.log('クリックされました')}
>
  アクション実行
</Button>`}
      />
      <Typography variant="h3" id="mui-variants">
        MUIのvariantプロパティ
      </Typography>
      <Typography>MUIでは以下のvariantが利用可能です：</Typography>{" "}
      <CodePreview
        code={`{/* Primary相当 - 最も目立つボタン */}
<Button variant="contained" color="primary">
  メインアクション
</Button>

{/* Secondary相当 - 輪郭線のみのボタン */}
<Button variant="outlined" color="primary">
  サブアクション
</Button>

{/* テキストのみのボタン - 最も控えめ */}
<Button variant="text" color="primary">
  補助的なアクション
</Button>`}
      />
      <Typography variant="h3" id="mui-colors">
        色とテーマの活用
      </Typography>
      <Typography>
        MUIのテーマシステムを活用することで、アプリケーション全体で一貫した色使いを実現：
      </Typography>{" "}
      <CodePreview
        code={`{/* テーマカラーの使用 */}
<Button variant="contained" color="primary">Primary</Button>
<Button variant="contained" color="secondary">Secondary</Button>
<Button variant="contained" color="error">Error</Button>
<Button variant="contained" color="warning">Warning</Button>
<Button variant="contained" color="info">Info</Button>
<Button variant="contained" color="success">Success</Button>`}
      />
      <Typography variant="h3" id="mui-states">
        状態管理の実装
      </Typography>{" "}
      <Typography>MUIでのボタン状態の実装例：</Typography>
      <CodeBlock
        fileName="状態管理の実装例"
        code={`import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";

function StatefulButton() {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // 非同期処理をシミュレート
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('処理が完了しました！');
    } catch (error) {
      alert('エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 無効状態 */}
      <Button disabled={disabled}>
        無効なボタン
      </Button>

      {/* ローディング状態 */}
      <Button 
        variant="contained"
        disabled={loading}
        onClick={handleSubmit}
        startIcon={loading ? <CircularProgress size={20} /> : null}
      >
        {loading ? '処理中...' : '送信'}
      </Button>

      {/* 状態切り替えコントロール */}
      <Button 
        variant="outlined"
        onClick={() => setDisabled(!disabled)}
      >
        無効状態を{disabled ? '解除' : '有効化'}
      </Button>
    </>
  );
}`}
      />
      <Typography variant="h3" id="mui-accessibility">
        MUIでのアクセシビリティ実装
      </Typography>
      <Typography>
        MUIは多くのアクセシビリティ機能を標準で提供していますが、さらに強化することができます：
      </Typography>{" "}
      <CodePreview
        code={`{/* ARIA属性の追加 */}
<Button 
  aria-label="メニューを開く"
  aria-expanded={menuOpen}
  aria-controls="menu-list"
>
  メニュー
</Button>

{/* 説明文の関連付け */}
<Button 
  aria-describedby="button-help-text"
>
  送信
</Button>
<Typography id="button-help-text" variant="caption">
  フォームの内容を送信します
</Typography>`}
      />
      <Typography variant="h3" id="mui-demo">
        実際の動作デモ
      </Typography>
      <Typography>
        以下は、MUIを使用したButtonコンポーネントの実際の動作例です：
      </Typography>
      <div className="flex">
        <NormalButton />
      </div>{" "}
      <Space />
      <Typography variant="h3">参考リンク</Typography>
      <div>
        <Link
          text="MUI公式のButtonページ"
          url="https://mui.com/material-ui/react-button/"
        />
        <br />
        <Link
          text="Button APIページ"
          url="https://mui.com/material-ui/api/button/"
        />
        <br />
        <Link
          text="WCAG アクセシビリティガイドライン"
          url="https://www.w3.org/WAI/WCAG21/quickref/"
        />
      </div>
    </div>
  );
};

export default ButtonComponent;
