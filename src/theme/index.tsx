// src/theme/index.tsx などのファイルを作成
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
      light: "#757de8",
      dark: "#002984",
    },
    secondary: {
      main: "#f50057",
      light: "#ff5983",
      dark: "#bb002f",
    },
    success: {
      main: "#4caf50",
    },
    info: {
      main: "#2196f3",
    },
    warning: {
      main: "#ff9800",
    },
    error: {
      main: "#f44336",
    },
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      // 他のグレースケール
    },
  },
});

export default theme;
