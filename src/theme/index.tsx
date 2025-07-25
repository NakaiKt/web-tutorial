// src/theme/index.tsx などのファイルを作成
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    code: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(0, 160, 125)",
      light: "rgb(0, 200, 155)",
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
      100: "#f0f0f0",
    },
  },
  typography: {
    h1: {
      fontWeight: "bold",
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: "bold",
      fontSize: "2rem",
      borderBottom: "1px solid",
      borderTop: "1px solid",
      borderColor: "rgb(0, 160, 125)",
      paddingBottom: "0.5rem",
      marginBottom: "1rem",
      paddingTop: "0.5rem",
      marginTop: "1rem",
      color: "rgb(0, 160, 125)",
    },
    h3: {
      fontWeight: "bold",
      fontSize: "1.8rem",
      marginBottom: "0.5rem",
      marginTop: "3rem",
      color: "rgb(0, 160, 125)",
    },
    h4: {
      fontWeight: "bold",
      fontSize: "1.6rem",
      marginTop: "2rem",
    },
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: "code" },
          style: {
            fontFamily: "Noto Sans JP, sans-serif",
            fontStyle: "italic",
            fontSize: "0.8rem",
            backgroundColor: "rgb(240, 240, 240)",
            padding: "0.2rem",
            margin: "0.2rem",
          },
        },
      ],
    },
  },
});

export default responsiveFontSizes(theme);
