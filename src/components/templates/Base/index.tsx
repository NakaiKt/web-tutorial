import { Typography, Box } from "@mui/material";
import Link from "@/components/parts/Link";

const Base = () => {
  return (
    <Box>
      <Typography>
        ここでは基本的なCSSやHTMLの内容，レイアウト要素など，フロントエンド開発に必要不可欠な要素を扱う．
        <br />
        使用するTailwindのバージョンやMUIのバージョンは
        <Link text="ここ" url="/" />
        を参照してください
      </Typography>
    </Box>
  );
};

export default Base;
