import { Typography, Box } from "@mui/material";
import Link from "@/components/parts/Link";

const Home = () => {
  return (
    <div>
      <Typography>
        これはCSS, MUI, React, ReactHookFormのチュートリアルです
        <br />
        実装は
      </Typography>
      <Link text="github" url="https://github.com/NakaiKt/web-tutorial" />
      <Typography>環境は以下を参考にしてください</Typography>{" "}
      <Box
        component="pre"
        sx={{
          // テーマ対応: ダークモード時に適切な背景色を使用
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "grey.100",
          // テキスト色もテーマに応じて調整
          color: "text.primary",
          padding: 2,
          borderRadius: 1,
        }}
      >
        <code>
          TypeScript: 5,
          <br />
          Next: 15.3.1
          <br />
          React: 19.0.0
          <br />
          ReactDOM: 19.0.0
          <br />
          Tailwind: 4
          <br />
          ReactHookForm: 7.56.1 <br />
          MUI: 7.0.2
        </code>
      </Box>
    </div>
  );
};

export default Home;
