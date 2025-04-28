import { Box } from "@mui/material";

/**
 * 横方向のスペースを統一して挿入するためのコンポーネント
 */
const Space = () => {
  return (
    <Box
      sx={{
        display: "inline-block",
        width: 2,
        height: "auto",
      }}
    />
  );
};

export default Space;
