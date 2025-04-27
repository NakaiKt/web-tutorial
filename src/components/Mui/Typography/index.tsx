import { Typography } from "@mui/material";

const Pages = () => {
  return (
    <div>
      Typographyはテキストを表示するコンポーネント．
      <br />
      通常のHTMLのh1~h6などのテキストとの違いは
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
