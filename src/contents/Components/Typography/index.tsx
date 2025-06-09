import { Typography, Box } from "@mui/material";
import BulletPoints from "@/components/parts/BulletPoints";
import Space from "@/components/parts/Space";
import CodeBlock from "@/components/parts/CodeBlock";
import Link from "@/components/parts/Link";
import CodePreview from "@/components/parts/CodePreview";

const TypographyComponent = () => {
  const TypographyConceptList = [
    "テキストコンテンツの視覚的階層構造を定義する",
    "読みやすさと情報の整理を向上させる",
    "ブランドアイデンティティとトーンを表現する",
    "アクセシビリティを考慮したセマンティックな構造を提供する",
  ];

  const TypographyPrinciplesList = [
    "階層の明確化: 見出し、本文、キャプションなどの役割を視覚的に区別",
    "読みやすさ: 適切なフォントサイズ、行間、文字間隔の設定",
    "一貫性: アプリケーション全体で統一されたテキストスタイル",
    "レスポンシブ対応: デバイスサイズに応じた最適なテキスト表示",
  ];

  const TypographyAccessibilityList = [
    "適切なHTMLセマンティクス（h1-h6の階層構造）の維持",
    "十分なコントラスト比の確保（WCAG AA基準: 4.5:1以上）",
    "スクリーンリーダーでの読み上げ順序の考慮",
    "フォントサイズの適切な設定（最小16px推奨）",
  ];

  // MUI固有の内容
  const TypographyVariantsList = [
    "h1, h2, h3, h4, h5, h6: 見出し用（サイズ順）",
    "subtitle1, subtitle2: サブタイトル用",
    "body1, body2: 本文用（body1が標準、body2が小さめ）",
    "button: ボタンテキスト用",
    "caption: キャプション・補足テキスト用",
    "overline: オーバーライン（大文字の小さなテキスト）用",
  ];

  return (
    <div>
      <Typography>
        Typographyは、Webアプリケーションにおけるテキスト表示の基盤となる重要な要素です。
        <br />
        適切なタイポグラフィにより、情報の階層構造を明確にし、優れたユーザーエクスペリエンスを提供できます。
      </Typography>

      <Typography variant="h2" id="concept">
        Typography の基本概念
      </Typography>
      <Typography>
        Typographyは、テキストを単なる文字の集合ではなく、
        デザインと情報伝達の重要な要素として扱います：
      </Typography>
      <BulletPoints items={TypographyConceptList} />

      <Typography variant="h3" id="design-principles">
        設計原則
      </Typography>
      <Typography>効果的なTypographyを実現するための基本原則：</Typography>
      <BulletPoints items={TypographyPrinciplesList} />

      <Typography>
        <Typography component="span" sx={{ fontWeight: "bold" }}>
          情報設計の観点
        </Typography>
        ：Typographyは視覚的な美しさだけでなく、情報の構造化と理解促進の役割を担います。
        ユーザーが必要な情報を素早く見つけ、理解できるような階層設計が重要です。
      </Typography>

      <Typography variant="h3" id="accessibility">
        アクセシビリティの考慮事項
      </Typography>
      <Typography>
        優れたTypographyは、すべてのユーザーにとって読みやすく、理解しやすいものである必要があります：
      </Typography>
      <BulletPoints items={TypographyAccessibilityList} />

      <Typography variant="h3" id="semantic-structure">
        セマンティックな構造の重要性
      </Typography>
      <Typography>
        見た目のスタイルとHTMLの意味的構造は分離して考えることが重要です。
        例えば、「h3のような見た目だがdiv要素」や「h1の見た目だがspan要素」といった、
        柔軟な組み合わせを可能にすることで、SEOとアクセシビリティを損なうことなく、
        デザインの要求を満たすことができます。
      </Typography>

      <Typography variant="h2" id="mui-implementation">
        MUI実装
      </Typography>
      <Typography>
        以下では、Material-UIライブラリを使用したTypographyコンポーネントの具体的な実装方法を説明します。
      </Typography>

      <Typography variant="h3" id="mui-basic">
        基本的な使用方法
      </Typography>
      <Typography>
        MUIのTypographyコンポーネントは、variantプロパティでテキストスタイルを指定できます：
      </Typography>

      <CodeBlock
        fileName="基本的な使用例"
        code={`{/* 見出し */}
<Typography variant="h1">メインタイトル</Typography>
<Typography variant="h2">セクションタイトル</Typography>

{/* 本文 */}
<Typography variant="body1">標準の本文テキスト</Typography>
<Typography variant="body2">小さめの本文テキスト</Typography>

{/* その他 */}
<Typography variant="caption">キャプションテキスト</Typography>`}
      />

      <Typography variant="h3" id="mui-variants">
        MUIのvariantプロパティ
      </Typography>
      <Typography>MUIでは以下のvariantが利用可能です：</Typography>
      <BulletPoints items={TypographyVariantsList} />

      <Typography>実際の表示例：</Typography>
      <Box
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: 1,
          padding: 2,
          marginY: 2,
        }}
      >
        <Typography variant="h1" component="div">
          h1 - メインタイトル
        </Typography>
        <Typography variant="h2" component="div">
          h2 - セクションタイトル
        </Typography>
        <Typography variant="h3" component="div">
          h3 - サブセクション
        </Typography>
        <Typography variant="h4" component="div">
          h4 - 小見出し
        </Typography>
        <Typography variant="h5" component="div">
          h5 - 詳細見出し
        </Typography>
        <Typography variant="h6" component="div">
          h6 - 最小見出し
        </Typography>
        <Typography variant="subtitle1" component="div">
          subtitle1 - サブタイトル（大）
        </Typography>
        <Typography variant="subtitle2" component="div">
          subtitle2 - サブタイトル（小）
        </Typography>
        <Typography variant="body1" component="div">
          body1 - 標準本文
        </Typography>
        <Typography variant="body2" component="div">
          body2 - 小さめ本文
        </Typography>
        <Typography variant="button" component="div">
          BUTTON - ボタンテキスト
        </Typography>
        <Typography variant="caption" component="div">
          caption - キャプション
        </Typography>
        <Typography variant="overline" component="div">
          OVERLINE - オーバーライン
        </Typography>
      </Box>

      <Typography variant="h3" id="component-separation">
        variantとcomponentの分離
      </Typography>
      <Typography>
        MUIの重要な特徴の一つは、見た目（variant）とHTMLの要素（component）を分離できることです：
      </Typography>

      <CodePreview
        code={`{/* h1の見た目だが、HTML的にはspan要素 */}
<Typography variant="h1" component="span">
  span要素だがh1の見た目
</Typography>

{/* h3の見た目だが、HTML的にはh2要素（SEO対策） */}
<Typography variant="h3" component="h2">
  HTML的にはh2だが、h3の見た目
</Typography>

{/* body1の見た目だが、HTML的にはp要素 */}
<Typography variant="body1" component="p">
  段落としての本文
</Typography>`}
      />

      <Typography>
        <Typography component="span" sx={{ fontWeight: "bold" }}>
          なぜこの分離が重要か
        </Typography>
        ：デザインの都合でh1の見た目が欲しい場合でも、HTML構造的にはspan要素が適切な場合があります。
        また、SEOやアクセシビリティの観点では適切な見出し階層（h1→h2→h3）を保ちながら、
        視覚的には異なるスタイルを適用したい場合にも有効です。
      </Typography>

      <Typography variant="h3" id="mui-theme-integration">
        テーマシステムとの連携
      </Typography>
      <Typography>
        MUIのTypographyは、テーマシステムと緊密に連携しており、
        アプリケーション全体で一貫したテキストスタイルを実現できます：
      </Typography>

      <CodeBlock
        fileName="テーマでのTypography設定例"
        code={`import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      borderBottom: '2px solid #1976d2',
      paddingBottom: '0.5rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    // レスポンシブ設定
    h1: {
      fontSize: '2.5rem',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
  },
});`}
      />

      <Typography variant="h3" id="mui-additional-props">
        追加プロパティの活用
      </Typography>
      <Typography>
        MUIのTypographyには、レイアウトと表示を制御する便利なプロパティがあります：
      </Typography>
      <CodePreview
        code={`{/* テキストの配置 */}
<Typography align="center">中央揃え</Typography>
<Typography align="right">右揃え</Typography>
<Typography align="justify">両端揃え</Typography>

{/* 下部マージンの自動追加 */}
<Typography gutterBottom>
  自動的に下部マージンが追加されます
</Typography>

{/* テキストの折り返し制御 */}
<Typography noWrap>
  長いテキストでも折り返さずに省略表示（...）
</Typography>

{/* カラーの指定 */}
<Typography color="primary">プライマリカラー</Typography>
<Typography color="secondary">セカンダリカラー</Typography>
<Typography color="error">エラーカラー</Typography>
<Typography color="textSecondary">セカンダリテキスト</Typography>`}
      />

      <Typography variant="h3" id="mui-responsive">
        レスポンシブ対応
      </Typography>
      <Typography>
        MUIのTypographyは、画面サイズに応じた自動調整機能も提供しています：
      </Typography>
      <CodePreview
        code={`{/* テーマでのレスポンシブ設定 */}
const theme = createTheme({
  typography: {
    h1: {
      fontSize: '3rem',
      {/* タブレット以下では小さく */}
      [theme.breakpoints.down('md')]: {
        fontSize: '2.5rem',
      },
      {/* スマートフォンではさらに小さく */}
      [theme.breakpoints.down('sm')]: {
        fontSize: '2rem',
      },
    },
  },
});

{/* sxプロパティでの直接指定 */}
<Typography 
  variant="h1" 
  sx={{
    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
  }}
>
  レスポンシブテキスト
</Typography>`}
      />

      <Typography variant="h3" id="practical-example">
        実践的な使用例
      </Typography>
      <Typography>記事やブログポストのような構造での使用例：</Typography>

      <Box
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: 1,
          padding: 3,
          marginY: 2,
        }}
      >
        <Typography variant="overline" color="textSecondary">
          技術記事
        </Typography>
        <Typography variant="h1" component="h1" gutterBottom>
          MUIを使ったモダンなWebアプリケーション開発
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Material-UIライブラリを活用した効率的な開発手法
        </Typography>{" "}
        <Typography variant="body1" component="p">
          本文の内容がここに入ります。MUIのTypographyコンポーネントを使用することで、
          一貫性のあるテキスト表示を実現できます。
        </Typography>
        <Typography variant="h2" component="h2" gutterBottom>
          セクションタイトル
        </Typography>
        <Typography variant="body1" component="p">
          セクションの内容です。適切な見出し階層とテキストスタイルにより、
          読みやすい文書構造を作成できます。
        </Typography>
        <Typography variant="caption" display="block">
          最終更新: 2024年6月4日 | 著者: 開発チーム
        </Typography>
      </Box>

      <Space />
      <Typography variant="h3">参考リンク</Typography>
      <div>
        <Link
          text="MUI公式のTypographyページ"
          url="https://mui.com/material-ui/react-typography/"
        />
        <br />
        <Link
          text="Typography APIページ"
          url="https://mui.com/material-ui/api/typography/"
        />
        <br />
        <Link
          text="Webタイポグラフィの基礎"
          url="https://developer.mozilla.org/ja/docs/Learn/CSS/Styling_text"
        />
      </div>
    </div>
  );
};

export default TypographyComponent;
