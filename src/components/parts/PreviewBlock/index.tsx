import { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * PreviewBlockコンポーネント
 *
 * 仕様: ダークモードの影響を受けずライトモード固定
 * - 背景色: bg-gray-300 (Tailwind) でコンテナ部分を固定
 * - 内部のMUIコンポーネント: 強制的にライトモードテーマを適用
 * - 目的: 色を使ったレイアウト例がモードに影響されずに正確に表示される
 */
const PreviewBlock = ({ children, className }: Props) => {
  // ライトモード固定のテーマを作成
  const lightTheme = createTheme({
    palette: {
      mode: "light",
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
    },
  });

  return (
    <div className="bg-gray-300 text-black p-4">
      {/* PreviewBlock内のMUIコンポーネントを強制的にライトモードで表示 */}
      <ThemeProvider theme={lightTheme}>
        <div className={className}>{children}</div>
      </ThemeProvider>
    </div>
  );
};

export default PreviewBlock;
