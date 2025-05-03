import NextLink from "next/link";
import MuiLink from "@mui/material/Link";

type LinkProps = {
  text: string;
  url: string;
};

const Link = ({ text, url }: LinkProps) => (
  <MuiLink
    component={NextLink}
    href={url}
    sx={{
      mx: 1,
      color: "primary.main",
      textDecoration: "underline",
      cursor: "pointer",
    }}
  >
    {text}
  </MuiLink>
);

export default Link;
