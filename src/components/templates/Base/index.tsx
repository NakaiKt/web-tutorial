import { Typography, Box } from "@mui/material";
import Link from "@/components/parts/Link";

const Base = () => {
  return (
    <Box>
      <Typography>
        使用するTailwindのバージョンやMUIのバージョンは
        <Link text="ここ" url="/" />
        を参照してください
      </Typography>
    </Box>
  );
};

export default Base;
