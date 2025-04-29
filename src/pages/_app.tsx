import "@/styles/globals.css";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import SideMenu from "@/features/SideMenu";
import { Box } from "@mui/material";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <Component {...pageProps} />
      </Box>
    </ThemeProvider>
  );
}
