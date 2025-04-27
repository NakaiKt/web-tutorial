import { Typography, Box, Link as MuiLink } from "@mui/material";
import Link from "next/link";

const Tailwind = () => {
  return (
    <Box>
      <Typography>
        使用するTailwindのバージョンは
        <Link href="/" passHref>
          <MuiLink
            sx={{
              mx: 1,
              color: "primary.main",
              fontWeight: "medium",
              textDecoration: "underline",
            }}
          >
            ここ
          </MuiLink>
        </Link>
        を参照してください
      </Typography>
    </Box>
  );
};

export default Tailwind;
