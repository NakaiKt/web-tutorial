import NextLink from "next/link";
import { Link as MuiLink } from "@mui/material";

type LinkProps = {
  text: string;
  url: string;
};

const Link = ({ text, url }: LinkProps) => {
  return (
    <div>
      <NextLink href={url} passHref>
        <MuiLink
          sx={{
            mx: 1,
            color: "primary.main",
            fontWeight: "medium",
            textDecoration: "underline",
          }}
        >
          {text}
        </MuiLink>
      </NextLink>
    </div>
  );
};

export default Link;
