import { Typography, List, ListItem, ListItemText } from "@mui/material";

const Pages = () => {
  const TypographyFeatureList = [
    "アプリケーション全体で一貫したテキストスタイルを保証できる",
    "フォントファミリー，ウェイト，サイズ，行の高さなどが自動的にテーマに基づいて調整される",
  ]
  return (
    <div>
      <Typography>
      Typographyはテキストを表示するコンポーネント．
      <br />
      通常のHTMLのh1~h6などのテキストとの違いは
      <List component="ul" disablePadding sx={{pl: 2}}>
        {
          TypographyFeatureList.map((feature, index) => (
            <ListItem
              key={}
        }
      </List>
      </Typography>
    <div className="flex">
      <Typography variant="h1">h1. Heading</Typography>
      <Typography variant="h2">h2. Heading</Typography>
      <Typography variant="h3">h3. Heading</Typography>
      <Typography variant="h4">h4. Heading</Typography>
      <Typography variant="h5">h5. Heading</Typography>
      <Typography variant="h6">h6. Heading</Typography>
    </div>
    </div>
  );
};

export default Pages;
