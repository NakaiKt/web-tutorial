import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Brightness7, Brightness4 } from "@mui/icons-material";
import { useThemeMode } from "@/contexts/ThemeContext";

/**
 * テーマ切り替えボタンコンポーネント
 *
 * MUI v7の機能を活用したダークモード切り替え実装：
 * - IconButton: マテリアルデザインに準拠したアイコンボタン
 * - Tooltip: ユーザビリティ向上のためのツールチップ表示
 * - Brightness7/Brightness4: ライト/ダークモードを表現するMUIアイコン
 */
const ThemeToggleButton: React.FC = () => {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Tooltip
      title={
        mode === "light" ? "ダークモードに切り替え" : "ライトモードに切り替え"
      }
    >
      <IconButton
        onClick={toggleTheme}
        sx={{
          // テーマに応じた色設定
          color: "text.primary",
          // ホバー効果でユーザビリティ向上
          "&:hover": {
            backgroundColor: "action.hover",
          },
          // スムーズなトランジション効果
          transition: "all 0.3s ease-in-out",
        }}
        aria-label="テーマ切り替え"
      >
        {mode === "light" ? (
          <Brightness4 /> // ダークモードアイコン（月マーク）
        ) : (
          <Brightness7 /> // ライトモードアイコン（太陽マーク）
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggleButton;
