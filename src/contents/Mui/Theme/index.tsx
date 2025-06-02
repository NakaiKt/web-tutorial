import {
  Typography,
  Box,
  Button,
  Paper,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CodeBlock from "@/components/parts/CodeBlock";
import PreviewBlock from "@/components/parts/PreviewBlock";
import Space from "@/components/parts/Space";
import Link from "@/components/parts/Link";

const Theme = () => {
  const [demoMode, setDemoMode] = useState<"light" | "dark">("light");

  // デモ用のカスタムテーマ
  const customLightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#1976d2", // Material Design Blue
      },
      secondary: {
        main: "#dc004e", // Material Design Pink
      },
      background: {
        default: "#f5f5f5",
        paper: "#ffffff",
      },
    },
    typography: {
      h4: {
        fontWeight: 600,
      },
    },
  });

  const customDarkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#90caf9", // Light Blue for dark mode
      },
      secondary: {
        main: "#f48fb1", // Light Pink for dark mode
      },
      background: {
        default: "#121212",
        paper: "#1e1e1e",
      },
    },
    typography: {
      h4: {
        fontWeight: 600,
      },
    },
  });

  const demoTheme = demoMode === "dark" ? customDarkTheme : customLightTheme;

  return (
    <div>
      <Typography variant="h2">MUI Theme システム</Typography>
      <Typography>
        MUI（Material-UI）v7のテーマシステムを使用して、アプリケーション全体の外観をカスタマイズし、
        ダークモード/ライトモードの切り替えを実装する方法を学びます。
      </Typography>
      <Space />
      <Typography variant="h3">テーマシステムの基本概念</Typography>{" "}
      <Box component="ul" sx={{ pl: 2 }}>
        <Box component="li" sx={{ py: 0.2 }}>
          <Typography variant="body2">
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              createTheme()
            </Typography>
            : MUIテーマオブジェクトを作成する関数
          </Typography>
        </Box>
        <Box component="li" sx={{ py: 0.2 }}>
          <Typography variant="body2">
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              ThemeProvider
            </Typography>
            : Reactコンポーネントツリーにテーマを提供するProvider
          </Typography>
        </Box>
        <Box component="li" sx={{ py: 0.2 }}>
          <Typography variant="body2">
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              palette
            </Typography>
            : 色彩設計（カラーパレット）を定義
          </Typography>
        </Box>
        <Box component="li" sx={{ py: 0.2 }}>
          <Typography variant="body2">
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              typography
            </Typography>
            : フォント設定とタイポグラフィを定義
          </Typography>
        </Box>{" "}
        <Box component="li" sx={{ py: 0.2 }}>
          <Typography variant="body2">
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              mode
            </Typography>
            : &apos;light&apos; または &apos;dark&apos; でテーマモードを切り替え
          </Typography>
        </Box>
      </Box>
      <Space />
      <Typography variant="h3">基本的なテーマ作成</Typography>
      <Typography>
        MUIでは`createTheme()`関数を使用してカスタムテーマを作成します。
      </Typography>{" "}
      <CodeBlock
        language="typescript"
        fileName="基本的なテーマ定義"
        code={`import { createTheme, ThemeProvider } from '@mui/material/styles';

// ライトモード用テーマ
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // プライマリカラー（青）
    },
    secondary: {
      main: '#dc004e', // セカンダリカラー（ピンク）
    },
    background: {
      default: '#f5f5f5', // ページ背景色
      paper: '#ffffff',   // Paper コンポーネント背景色
    },
  },
  typography: {
    h4: {
      fontWeight: 600, // 見出しのフォントウェイト
    },
  },
});

// ダークモード用テーマ
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // ダークモード用の明るい青
    },
    secondary: {
      main: '#f48fb1', // ダークモード用の明るいピンク
    },
    background: {
      default: '#121212', // ダークモード背景色
      paper: '#1e1e1e',   // ダークモード Paper背景色
    },
  },
});`}
      />
      <Space />
      <Typography variant="h3">ThemeProvider の使用</Typography>
      <Typography>
        作成したテーマをアプリケーションに適用するには、`ThemeProvider`でコンポーネントツリーをラップします。
      </Typography>{" "}
      <CodeBlock
        language="typescript"
        fileName="ThemeProviderの基本使用法"
        code={`import { ThemeProvider } from '@mui/material/styles';
import { Button, Paper } from '@mui/material';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ p: 2 }}>
        <Button 
          variant="contained" 
          onClick={() => setDarkMode(!darkMode)}
        >
          テーマ切り替え
        </Button>
      </Paper>
    </ThemeProvider>
  );
}`}
      />
      <Space />
      <Typography variant="h3">デモ: テーマ切り替え</Typography>
      <Typography>
        以下のデモで、ライトモードとダークモードの違いを確認できます。
      </Typography>
      <PreviewBlock>
        <ThemeProvider theme={demoTheme}>
          <Paper
            sx={{
              p: 3,
              minHeight: 200,
              backgroundColor: "background.paper",
              border: 1,
              borderColor: "divider",
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={demoMode === "dark"}
                  onChange={(e) =>
                    setDemoMode(e.target.checked ? "dark" : "light")
                  }
                />
              }
              label={`現在のモード: ${
                demoMode === "dark" ? "ダーク" : "ライト"
              }`}
            />

            <Box sx={{ mt: 2 }}>
              <Typography variant="h4" color="primary" gutterBottom>
                カスタムテーマのデモ
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                このテキストは現在のテーマに基づいて表示されています。
                背景色、文字色、プライマリカラーが動的に変化します。
              </Typography>

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button variant="contained" color="primary">
                  プライマリボタン
                </Button>
                <Button variant="contained" color="secondary">
                  セカンダリボタン
                </Button>
                <Button variant="outlined">アウトラインボタン</Button>
              </Box>
            </Box>
          </Paper>
        </ThemeProvider>
      </PreviewBlock>
      <Space />
      <Typography variant="h3">
        React Context を使用したグローバルテーマ管理
      </Typography>
      <Typography>
        実際のアプリケーションでは、React Context
        APIを使用してテーマ状態をグローバルに管理します。
      </Typography>{" "}
      <CodeBlock
        language="typescript"
        fileName="ThemeContext の実装"
        code={`// src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('light');

  // ローカルストレージからテーマ設定を読み込み
  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as ThemeMode;
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      setMode(savedMode);
    }
  }, []);

  // テーマ変更時にローカルストレージに保存
  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  // MUIテーマオブジェクトを動的に作成
  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#90caf9' : '#1976d2',
      },
      secondary: {
        main: mode === 'dark' ? '#f48fb1' : '#dc004e',
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline /> {/* MUIのベースライン CSS リセット */}
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

// カスタムフックでContextを使いやすくする
export const useThemeMode = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeMode は ThemeContextProvider 内で使用してください');
  }
  return context;
};`}
      />
      <Space />
      <Typography variant="h3">テーマ切り替えボタンコンポーネント</Typography>
      <Typography>
        ユーザーがテーマを切り替えるためのUIコンポーネントを作成します。
      </Typography>{" "}
      <CodeBlock
        language="typescript"
        fileName="ThemeToggleButton コンポーネント"
        code={`// src/components/parts/ThemeToggleButton/index.tsx
import { IconButton, Tooltip } from '@mui/material';
import { Brightness7, Brightness4 } from '@mui/icons-material';
import { useThemeMode } from '@/contexts/ThemeContext';

const ThemeToggleButton = () => {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Tooltip title={\`\${mode === 'dark' ? 'ライト' : 'ダーク'}モードに切り替え\`}>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        aria-label={\`\${mode === 'dark' ? 'ライト' : 'ダーク'}モードに切り替え\`}
        sx={{
          // テーマに応じたホバー効果
          '&:hover': {
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggleButton;`}
      />
      <Space />
      <Typography variant="h3">アプリケーション全体への適用</Typography>
      <Typography>
        Next.jsの`_app.tsx`でアプリケーション全体にテーマを適用します。
      </Typography>{" "}
      <CodeBlock
        language="typescript"
        fileName="_app.tsx でのテーマ統合"
        code={`// src/pages/_app.tsx
import { ThemeContextProvider } from '@/contexts/ThemeContext';
import ThemeToggleButton from '@/components/parts/ThemeToggleButton';
import { Box } from '@mui/material';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeContextProvider>
      <Box sx={{ position: 'relative' }}>
        {/* テーマ切り替えボタンを右上に固定配置 */}
        <Box
          sx={{
            position: 'fixed',
            top: 16,
            right: 16,
            zIndex: 1300,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(0, 0, 0, 0.6)'
                : 'rgba(255, 255, 255, 0.8)',
            borderRadius: 1,
            backdropFilter: 'blur(8px)',
          }}
        >
          <ThemeToggleButton />
        </Box>
        
        <Component {...pageProps} />
      </Box>
    </ThemeContextProvider>
  );
}`}
      />
      <Space />
      <Typography variant="h3">コンポーネントでのテーマ活用</Typography>
      <Typography>
        個々のコンポーネントでテーマ値を使用する方法を説明します。
      </Typography>{" "}
      <CodeBlock
        language="typescript"
        fileName="sx prop でのテーマ関数使用"
        code={`import { Box, Typography } from '@mui/material';

const ThemedComponent = () => {
  return (
    <Box
      sx={{
        // テーマ関数を使用した動的スタイリング
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.1)' // ダークモード時
            : 'grey.100',                // ライトモード時
        
        color: 'text.primary', // テーマのテキストカラーを使用
        padding: 2,
        borderRadius: 1,
        
        // ホバー効果もテーマ対応
        '&:hover': {
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.15)'
              : 'grey.200',
        },
      }}
    >
      <Typography variant="h6">
        テーマ対応コンポーネント
      </Typography>
      <Typography variant="body2">
        このコンポーネントはテーマモードに応じて外観が変化します
      </Typography>
    </Box>
  );
};`}
      />
      <Space />
      <Typography variant="h3">ベストプラクティス</Typography>{" "}
      <Box component="ul" sx={{ pl: 2 }}>
        <Box component="li" sx={{ py: 0.2 }}>
          <Typography variant="body2">
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              一貫性
            </Typography>
            : テーマパレットの色を使用して、アプリ全体で一貫した色使いを保つ
          </Typography>
        </Box>
        <Box component="li" sx={{ py: 0.2 }}>
          <Typography variant="body2">
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              アクセシビリティ
            </Typography>
            : ダークモードでも十分なコントラスト比を確保する
          </Typography>
        </Box>
        <Box component="li" sx={{ py: 0.2 }}>
          <Typography variant="body2">
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              パフォーマンス
            </Typography>
            : テーマオブジェクトは useMemo でメモ化を検討
          </Typography>
        </Box>
        <Box component="li" sx={{ py: 0.2 }}>
          <Typography variant="body2">
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              型安全性
            </Typography>
            : TypeScript でテーマの型定義を拡張して型安全性を向上
          </Typography>
        </Box>
        <Box component="li" sx={{ py: 0.2 }}>
          <Typography variant="body2">
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              ユーザー体験
            </Typography>
            : ユーザーの設定を localStorage で永続化
          </Typography>
        </Box>
        <Box component="li" sx={{ py: 0.2 }}>
          <Typography variant="body2">
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              レスポンシブ
            </Typography>
            : ブレークポイントもテーマで定義して一元管理
          </Typography>
        </Box>
      </Box>
      <Space /> <Typography variant="h3">参考リンク</Typography>
      <Box component="ul" sx={{ pl: 2 }}>
        <Box component="li" sx={{ py: 0.2 }}>
          <Link
            text="MUI Theming 公式ドキュメント"
            url="https://mui.com/material-ui/customization/theming/"
          />
        </Box>
        <Box component="li" sx={{ py: 0.2 }}>
          <Link
            text="Dark mode 実装ガイド"
            url="https://mui.com/material-ui/customization/dark-mode/"
          />
        </Box>
        <Box component="li" sx={{ py: 0.2 }}>
          <Link
            text="Color palette カスタマイズ"
            url="https://mui.com/material-ui/customization/palette/"
          />
        </Box>
        <Box component="li" sx={{ py: 0.2 }}>
          <Link
            text="Typography カスタマイズ"
            url="https://mui.com/material-ui/customization/typography/"
          />
        </Box>
      </Box>
    </div>
  );
};

export default Theme;
