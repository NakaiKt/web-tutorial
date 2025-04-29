import { Typography } from "@mui/material";
import BulletPoints from "@/components/parts/BulletPoints";
import Space from "@/components/parts/Space";
import CodeBlock from "@/components/parts/CodeBlock";
import Link from "@/components/parts/Link";

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
    "noWrap, gutterBottom, paragraphなど追加プロパティがある",
    "適切なARIAラベルが自動的に付与され，アクセシビリティ対応が容易になる",
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
      <Typography>を参照してください．</Typography>
      <Typography variant="h2">基本</Typography>
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

      <Typography variant="h2">
        通常のHTMLのh1~h6などのテキストとの違い
      </Typography>
      <Typography>通常のHTMLのh1~h6などのテキストとの違いは</Typography>
      <BulletPoints items={TypographyFeatureList} style="number" />
      <Space />
      <Typography variant="h3">{TypographyFeatureList[0]}</Typography>
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
      <Typography variant="h3"> {TypographyFeatureList[1]} </Typography>
    </div>
  );
};

export default Pages;
