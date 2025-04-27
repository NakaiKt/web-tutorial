import { Typography, Box } from "@mui/material";
import Link from "next/link";

const Tailwind = () => {
  return (
    <Box>
      <Typography variant="h1">Tailwindのドキュメント</Typography>
      <Typography>
        使用するTailwindのバージョンは
        <Link href="/">ここ</Link>
        を参照してください
      </Typography>
    </Box>
  );
};

export default Tailwind;
