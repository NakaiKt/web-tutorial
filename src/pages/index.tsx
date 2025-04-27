import { Typography, Box } from "@mui/material";

const Pages = () => {
  return (
    <div>
      <Typography variant="h1">tutorial</Typography>
      <Typography>
        これはCSS, MUI, React, ReactHookFormのチュートリアルです
        <br />
        環境は以下を参考にしてください
      </Typography>
      <Box
        component="pre"
        sx={{
          backgroundColor: "#f0f0f0",
        }}
      >
        `npx create-next-app@latest --ts`
      </Box>
    </div>
  );
};
export default Pages;
