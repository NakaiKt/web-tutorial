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
import Space from "@/components/parts/Space";
import Link from "@/components/parts/Link";
import BulletPoints from "@/components/parts/BulletPoints";

const ThemeComponent = () => {
  const [demoMode, setDemoMode] = useState<"light" | "dark">("light");

  // テーマの基本概念
  const ThemeConceptList = [
    "デザインシステムの一元管理: 色、タイポグラフィ、間隔などの統一",
    "一貫性の確保: アプリケーション全体で統一された外観と操作感",
    "保守性の向上: テーマを変更するだけで全体のスタイルを調整可能",
    "ブランドアイデンティティの表現: 企業やプロダクトの特色を反映",
  ];

  // デモ用のカスタムテーマ
  const customLightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#dc004e",
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
        main: "#90caf9",
      },
      secondary: {
        main: "#f48fb1",
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

  // デモコンポーネント
  const DemoComponent = () => (
    <Box sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        デモコンポーネント
      </Typography>
      <Typography variant="body1" paragraph>
        このコンポーネントはテーマモードに応じて外観が変化します
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button variant="contained" color="primary">
          Primary
        </Button>
        <Button variant="contained" color="secondary">
          Secondary
        </Button>
      </Box>
    </Box>
  );

  return (
    <div>
      <Typography>
        テーマシステムは、Webアプリケーションの視覚的な一貫性とブランドアイデンティティを管理する
        重要な仕組み
      </Typography>

      <Typography variant="h2" id="concept">
        テーマシステムの基本概念
      </Typography>
      <Typography>テーマシステムは以下の要素から構成されます：</Typography>
      <BulletPoints items={ThemeConceptList} />

      <Typography>
        <Typography component="span" sx={{ fontWeight: "bold" }}>
          デザインシステムとしての役割
        </Typography>
        ：テーマは単なるスタイルの集合ではなく、プロダクトの視覚的な言語を定義する包括的なシステムとして機能
        <br />
        これにより、チーム全体で一貫したデザイン判断を行える
      </Typography>

      <Typography>
        <Typography component="span" sx={{ fontWeight: "bold" }}>
          ユーザビリティの観点
        </Typography>
        ：ダークモードは単なる見た目の変更ではなく、異なる使用環境や
        ユーザーの身体的特性に配慮したアクセシビリティ機能としても重要です。
      </Typography>

      <Typography variant="h2" id="mui-implementation">
        MUI実装
      </Typography>

      <Typography variant="h3" id="mui-basic-setup">
        基本的なテーマ設定
      </Typography>
      <Typography>
        MUIでは、createTheme関数でテーマオブジェクトを作成し、ThemeProviderで適用する：
      </Typography>

      <CodeBlock
        fileName="基本的なテーマ設定"
        code={`{/* テーマの作成 */}
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  spacing: 8, {/* 1単位 = 8px */}
});

{/* アプリケーションへの適用 */}
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* アプリケーションコンポーネント */}
    </ThemeProvider>
  );
}`}
      />

      <Typography variant="h3" id="mui-palette">
        カラーパレットの設定
      </Typography>
      <Typography>
        MUIのパレットシステムでは、セマンティックな色の役割を定義できる：
      </Typography>
      <Link
        url="https://mui.com/material-ui/customization/palette/"
        text="デフォルトで設定されているテーマ"
      />
      <CodeBlock
        code={`const theme = createTheme({
  palette: {
    mode: 'light', {/* または 'dark' */}
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    secondary: {
      main: '#dc004e',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },
    background: {
      default: '#fafafa',
      paper: '#fff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
    },
  },
});`}
      />

      <Typography variant="h3" id="mui-dark-mode">
        モードの実装
      </Typography>
      <Typography>
        MUIでは、複数のテーマを定義し、アプリケーションの状態に応じて切り替えることで、ダークモードのような異なる表示モードを実装できる。
        以下は、ライトモードとダークモードのテーマを個別に定義し、切り替える例。
      </Typography>

      <CodeBlock
        fileName="モード実装（ライト/ダーク）"
        code={`import { useState, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Switch } from '@mui/material';

// ライトモード用のテーマ
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // ライトモードのプライマリカラー
    },
    secondary: {
      main: '#dc004e', // ライトモードのセカンダリカラー
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    }
    // ...その他のライトモード設定
  },
});

// ダークモード用のテーマ
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // ダークモードのプライマリカラー
    },
    secondary: {
      main: '#f48fb1', // ダークモードのセカンダリカラー
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    }
    // ...その他のダークモード設定
  },
});

function App() {
  const [currentMode, setCurrentMode] = useState<'light' | 'dark'>('light');

  // 現在のモードに応じてテーマを選択
  const theme = useMemo(
    () => (currentMode === 'dark' ? darkTheme : lightTheme),
    [currentMode]
  );

  const toggleMode = () => {
    setCurrentMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch
        checked={currentMode === 'dark'}
        onChange={toggleMode}
      />
      {/* アプリケーションコンテンツ */}
    </ThemeProvider>
  );
}`}
      />

      <Typography variant="h3" id="mui-typography-theme">
        タイポグラフィテーマ
      </Typography>
      <Typography>テキストスタイルもテーマで一元管理できる：</Typography>

      <CodeBlock
        code={`const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      borderBottom: '2px solid',
      borderColor: 'primary.main',
      paddingBottom: '0.5rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      textTransform: 'none', {/* 大文字変換を無効化 */}
    },
  },
});`}
      />

      <Typography variant="h3" id="live-demo">
        ライブデモ
      </Typography>
      <Typography>
        以下のデモで、ライト/ダークモードの切り替えを体験できる：
      </Typography>

      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          p: 2,
          my: 2,
        }}
      >
        <FormControlLabel
          control={
            <Switch
              checked={demoMode === "dark"}
              onChange={(e) => setDemoMode(e.target.checked ? "dark" : "light")}
            />
          }
          label={`テーマモード: ${demoMode === "dark" ? "ダーク" : "ライト"}`}
        />

        <ThemeProvider theme={demoTheme}>
          <Paper elevation={1} sx={{ mt: 2 }}>
            <DemoComponent />
          </Paper>
        </ThemeProvider>
      </Box>

      <Typography variant="h3" id="advanced-theming">
        高度なテーマカスタマイズ
      </Typography>
      <Typography>
        コンポーネント固有のスタイルもテーマで定義できる：
      </Typography>

      <CodeBlock
        code={`const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {          borderRadius: 8, {/* 角丸を8pxに */}
          textTransform: 'none', {/* 大文字変換を無効 */}
          fontWeight: 600,
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #FE6B8B 60%, #FF8E53 100%)',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          background: 'linear-gradient(45deg, #333, #999)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
      },
    },
  },
});`}
      />

      <Space />
      <Typography variant="h3">参考リンク</Typography>
      <div>
        <Link
          text="MUI Theming 公式ドキュメント"
          url="https://mui.com/material-ui/customization/theming/"
        />
        <br />
        <Link
          text="Dark mode 実装ガイド"
          url="https://mui.com/material-ui/customization/dark-mode/"
        />
        <br />
        <Link
          text="Color palette カスタマイズ"
          url="https://mui.com/material-ui/customization/palette/"
        />
        <br />
        <Link
          text="Typography カスタマイズ"
          url="https://mui.com/material-ui/customization/typography/"
        />
      </div>
    </div>
  );
};

export default ThemeComponent;
