import { Typography, Box } from "@mui/material";
import Link from "@/components/parts/Link";

const Tailwind = () => {
  return (
    <Box>
      <Typography>
        使用するTailwindのバージョンは
        <Link text="ここ" url="https://tailwindcss.com/docs/installation" />
        を参照してください
      </Typography>
    </Box>
  );
};

export default Tailwind;
