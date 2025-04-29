import { Typography } from "@mui/material";
import BulletPoints from "@/components/parts/BulletPoints";
import Space from "@/components/parts/Space";
import CodeBlock from "@/components/parts/CodeBlock";

const Pages = () => {
  const TypographyFeatureList = [
    "アプリケーション全体で一貫したテキストスタイルを保証できる",
    "フォントファミリー，ウェイト，サイズ，行の高さなどが自動的にテーマに基づいて調整される",
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
        通常のHTMLのh1~h6などのテキストとの違いは
      </Typography>
      <BulletPoints items={TypographyFeatureList} style="number" />
      <Space />
      <Typography variant="h2">{TypographyFeatureList[0]}</Typography>
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
      <Typography variant="h2"> {TypographyFeatureList[1]} </Typography>
    </div>
  );
};

export default Pages;
