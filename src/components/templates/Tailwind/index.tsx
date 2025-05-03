import { Typography, Box } from "@mui/material";
import Link from "@/components/parts/Link";

const Tailwind = () => {
  return (
    <Box>
      <Typography>
        使用するTailwindのバージョンは
        <Link text="ここ" url="/" />
        を参照してください
      </Typography>
    </Box>
  );
};

export default Tailwind;
