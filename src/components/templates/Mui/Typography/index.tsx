import { Typography } from "@mui/material";
import BulletPoints from "@/components/parts/BulletPoints";
import Space from "@/components/parts/Space";
import CodeBlock from "@/components/parts/CodeBlock";
import Link from "@/components/parts/Link";
import CodePreview from "@/components/parts/CodePreview";

const Pages = () => {
  const TypographyStyleList = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "subtitle1",
    "subtitle2",
    "body1",
    "body2",
    "button",
    "caption",
    "overline",
  ];
  const TypographyFeatureList = [
    "アプリケーション全体で一貫したテキストスタイルを保証できる",
    "variantプロパティとcomponentプロパティの組み合わせで見た目とHTMLの要素を分離できる",
    "画面サイズに応じて自動的にフォントサイズを調整できる機能がある",
    "noWrap, gutterBottom, alignなど追加プロパティがある",
  ];
  const TypographyAlignList = [
    "inherit: 左寄せ",
    "center: 中央寄せ",
    "justify: 両端揃え",
    "left: 左寄せ",
    "right: 右寄せ",
  ];
  return (
    <div>
      <Typography>
        Typographyはテキストを表示するコンポーネント．
        <br />
        最新情報は
      </Typography>
      <Link
        text="MUI公式のTypographyページ"
        url="https://mui.com/material-ui/react-typography/"
      />
      <Link
        text="Typography APIページ"
        url="https://mui.com/material-ui/api/typography/"
      />
      <Typography>を参照してください．</Typography>
      <Typography variant="h2" id="basic">
        基本
      </Typography>
      <Typography>
        Typographyはテキストを表示するコンポーネントで，代表的なものだと以下のようなスタイルを指定できる
      </Typography>
      <BulletPoints items={TypographyStyleList} />
      <Typography>これらのスタイルはvariantプロパティで指定する</Typography>
      <CodeBlock
        fileName="index.tsx"
        code={`
        <Typography variant="h1">
          これはh1のテキストです
        </Typography>
        `}
      />

      <Typography variant="h2" id="difference">
        通常のHTMLのh1~h6などのテキストとの違い
      </Typography>
      <Typography>通常のHTMLのh1~h6などのテキストとの違いは</Typography>
      <BulletPoints items={TypographyFeatureList} style="number" />
      <Space />
      <Typography variant="h3" id="guarantee-consistent-text-style">
        {TypographyFeatureList[0]}
      </Typography>
      <Typography variant="code">theme/index.tsx</Typography>
      <Typography>
        にて設定することで，全体で一貫したテキストスタイルを保証できる．
        <br />
        例えば，今回はh2テーマを以下のように設定しており，この章のh2スタイルに適用している
      </Typography>
      <CodeBlock
        fileName="theme/index.tsx"
        code={`
        const theme = createTheme({
        ...
        typography: {
          h2: {
            fontWeight: "bold",
            fontSize: "2rem",
            borderBottom: "1px solid",
            borderTop: "1px solid",
            borderColor: "rgb(0, 160, 125)",
            paddingBottom: "0.5rem",
            marginBottom: "1rem",
            paddingTop: "0.5rem",
            marginTop: "1rem",
            color: "rgb(0, 160, 125)",
          },
        },          
      `}
      />
      <Typography variant="h3" id="separate-text-style-and-html-element">
        {TypographyFeatureList[1]}
      </Typography>
      <Typography>
        Typographyはvariantプロパティでスタイルを，componentプロパティでHTMLの要素を指定できる．
      </Typography>
      <CodeBlock
        fileName="index.tsx"
        code={`
        <Typography variant="h1" component="h2">
          これはh1のスタイルでありながら，h2のHTML要素です．
        </Typography>
        `}
      />
      <Typography>これにより以下のような利点がある</Typography>
      <Typography variant="h4" id="seo-improvement">
        SEO対策になる
      </Typography>
      <Typography gutterBottom>
        ページ内に複数のh1要素があると，SEO的によくないといわれている．
        <br />
        しかし，デザイン上では複数個所でh1を使用したい場合がある．
      </Typography>
      <Typography>
        そのような場合に，componentプロパティを使用すると，h1のスタイルをそのままに，h2のHTML要素として表示することができる．
      </Typography>
      <Typography variant="h4" id="separate-design-and-structure">
        デザインと構造を分離できる
      </Typography>
      <Typography>
        デザイン変更時（variant変更）をしても，HTML構造を変えずに見た目だけ変えることが可能
      </Typography>
      <Typography variant="h3" id="responsive-font-size">
        {TypographyFeatureList[2]}
      </Typography>
      <Typography>
        デフォルトではフォントサイズは固定だが，以下のような設定をすることでウィンドウサイズ（PCのブラウザサイズ，スマホなどなど）によってサイズを変える設定ができる
      </Typography>
      <CodeBlock
        fileName="index.tsx"
        code={`
          import { createTheme, responsiveFontSizes } from "@mui/material/styles";
          let theme = createTheme({ /* ... */ });
          theme = responsiveFontSizes(theme);
          `}
      />
      <Typography>
        ただしこれはなめらかに変わるわけではなく，CSSのメディアクエリによる変更なので，ブレークポイントごとに段階的に変わる
      </Typography>
      <Typography variant="h3" id="additional-properties">
        {TypographyFeatureList[3]}
      </Typography>
      <Typography>
        Typographyにはもとのhtmlには存在しない（あるいは指定が面倒な）様々なオプションが提供されている
      </Typography>
      <Typography variant="h4" id="no-wrap">
        noWrap
      </Typography>
      <Typography>
        テキストがはみ出した場合に，テキストを折り返すかどうかを指定する
        <br />
        これを指定した場合，以下のように長い文章の末が「...」で省略される
      </Typography>
      <CodePreview
        code={`
  <Typography noWrap >
    長い文章長い文章長い文章長い文章長い文章長い文章長い文章
    長い文章長い文章長い文章長い文章長い文章長い文章長い文章
    長い文章長い文章長い文章長い文章長い文章長い文章長い文章
  </Typography>
      `}
      />
      <Typography variant="h4" id="gutter-bottom">
        gutterBottom
      </Typography>
      <Typography>
        要素の下に余白（マージン）を自動で追加する
        <br />
        追加されるマージンはデフォルトで<code>0.35em</code>
        （その要素のフォントサイズの0.35倍）であり、テーマで上書きしない限りこの値が使われる
      </Typography>
      <CodePreview
        code={`
  <Typography gutterBottom>
    要素の下に余白（マージン）を自動で追加する
  </Typography>
  <Typography>下との差はこれくらい</Typography>
  <Typography>
    指定しなかった場合はこれくらい
  </Typography>
        `}
      />

      <Typography variant="h4" id="align">
        align
      </Typography>
      <Typography>
        テキストの配置を指定する．
        <br />
        デフォルトではinheritであり，以下のような選択肢がある
      </Typography>
      <BulletPoints items={TypographyAlignList} />
      <Typography>
        これを指定した場合，以下のようにテキストの配置が変わる
      </Typography>
      <CodePreview
        code={`
  <Typography align="inherit" >
    align=&quot;inherit&quot;のテキスト
  </Typography>
  <Typography align="center">
    align=&quot;center&quot;のテキスト
  </Typography>
  <Typography align="justify">
    align=&quot;justify&quot;のテキスト
  </Typography>
  <Typography align="left">
    align=&quot;left&quot;のテキスト
  </Typography>
  <Typography align="right">
    align=&quot;right&quot;のテキスト
  </Typography>
      `}
      />
      <Typography>
        justifyとleftの違いは，英語を入力するときには顕著だが，日本語を入力するときには気にしなくていい(leftを選んでおけばいい)
      </Typography>

      <Typography variant="h4" id="color">
        color
      </Typography>
      <Typography>
        テーマで定義された色を簡単に使用できる．
        <br />
        これらの色はテーマで定義されており，アプリケーション全体で一貫した色を使用できる
        <br />
        デフォルトでは&quot;text.primary&quot;（黒の87%不透明度）が使用され，以下のような色が標準で用意されている
      </Typography>
      <CodePreview
        code={`
  <Typography color="text.primary">
    color=&quot;text.primary&quot;のテキスト（デフォルト）
  </Typography>
  <Typography color="text.secondary">
    color=&quot;text.secondary&quot;のテキスト（より薄い色）
  </Typography>
  <Typography color="text.disabled">
    color=&quot;text.disabled&quot;のテキスト（無効状態）
  </Typography>
  <Typography color="primary">
    color=&quot;primary&quot;のテキスト
  </Typography>
  <Typography color="secondary">
    color=&quot;secondary&quot;のテキスト
  </Typography>
  <Typography color="error">
    color=&quot;error&quot;のテキスト
  </Typography>
  <Typography color="warning">
    color=&quot;warning&quot;のテキスト
  </Typography>
  <Typography color="info">
    color=&quot;info&quot;のテキスト
  </Typography>
  <Typography color="success">
    color=&quot;success&quot;のテキスト
  </Typography>
      `}
      />

      <Typography variant="h4" id="font-weight">
        fontWeight
      </Typography>
      <Typography>
        フォントの太さを指定できる．
        <br />
        数値（100〜900）または文字列（&quot;light&quot;, &quot;regular&quot;,
        &quot;medium&quot;, &quot;bold&quot;）で指定可能
      </Typography>
      <CodePreview
        code={`
  <Typography fontWeight="light" >
    fontWeight=&quot;light&quot;のテキスト
  </Typography>
  <Typography fontWeight="regular" >
    fontWeight=&quot;regular&quot;のテキスト
  </Typography>
  <Typography fontWeight="medium" >
    fontWeight=&quot;medium&quot;のテキスト
  </Typography>
  <Typography fontWeight="bold" >
    fontWeight=&quot;bold&quot;のテキスト
  </Typography>
      `}
      />
      <Typography>数値での指定も可能</Typography>
      <CodePreview
        code={`
  <Typography fontWeight={300} >
    fontWeight=300のテキスト
  </Typography>
  <Typography fontWeight={900} >
    fontWeight=900のテキスト
  </Typography>
      `}
      />
    </div>
  );
};

export default Pages;
