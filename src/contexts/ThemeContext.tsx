import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// TypeScriptのモジュール拡張
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    code: true;
  }
}

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within a ThemeContextProvider");
  }
  return context;
};

interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
  children,
}) => {
  const [mode, setMode] = useState<ThemeMode>("light");

  // ブラウザのlocalStorageからテーマモードを復元（オプション）
  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode") as ThemeMode;
    if (savedMode && (savedMode === "light" || savedMode === "dark")) {
      setMode(savedMode);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  // ライトモード・ダークモード対応のテーマを作成
  const theme = React.useMemo(() => {
    const baseTheme = createTheme({
      palette: {
        mode,
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
        // ダークモード時の背景とテキスト色をMUIが自動設定
        ...(mode === "dark" && {
          background: {
            default: "#121212",
            paper: "#1e1e1e",
          },
          text: {
            primary: "#ffffff",
            secondary: "rgba(255, 255, 255, 0.7)",
          },
        }),
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
          // テーマ色を使用してダークモード対応
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
                // ダークモード対応: モードに応じて背景色を変更
                backgroundColor:
                  mode === "dark"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgb(240, 240, 240)",
                padding: "0.2rem",
                margin: "0.2rem",
                // ダークモード時の文字色調整
                color: mode === "dark" ? "#ffffff" : "inherit",
              },
            },
          ],
        },
      },
    });

    return responsiveFontSizes(baseTheme);
  }, [mode]);

  const contextValue: ThemeContextType = {
    mode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
