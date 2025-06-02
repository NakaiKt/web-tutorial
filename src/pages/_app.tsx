import "@/styles/globals.css";
import { ThemeContextProvider } from "@/contexts/ThemeContext";
import type { AppProps } from "next/app";
import SideMenu from "@/features/SideMenu";
import ThemeToggleButton from "@/components/parts/ThemeToggleButton";
import { Box } from "@mui/material";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>デザインガイド</title>
      </Head>
      <ThemeContextProvider>
        <Box sx={{ display: "flex", position: "relative" }}>
          {/* サイドメニュー */}
          <SideMenu />

          {/* メインコンテンツエリア */}
          <Box sx={{ flexGrow: 1, position: "relative" }}>
            {/* テーマ切り替えボタン - 固定位置：右上 */}
            <Box
              sx={{
                position: "fixed",
                top: 16,
                right: 16,
                zIndex: 1300, // MUIのAppBarより上に表示
                // テーマに応じた背景色で視認性を向上
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(0, 0, 0, 0.6)"
                    : "rgba(255, 255, 255, 0.8)",
                borderRadius: 1,
                backdropFilter: "blur(8px)", // ガラス効果
                boxShadow: (theme) =>
                  theme.palette.mode === "dark"
                    ? "0 4px 6px rgba(0, 0, 0, 0.3)"
                    : "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <ThemeToggleButton />
            </Box>

            {/* ページコンテンツ */}
            <Component {...pageProps} />
          </Box>
        </Box>
      </ThemeContextProvider>
    </>
  );
}
