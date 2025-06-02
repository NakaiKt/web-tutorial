import { Chip } from "@mui/material";
import { Search } from "@mui/icons-material";

interface SearchButtonProps {
  onClick: () => void;
}

export const SearchButton = ({ onClick }: SearchButtonProps) => {
  return (
    <Chip
      icon={<Search fontSize="small" />}
      label="検索"
      onClick={onClick}
      variant="filled"
      sx={{
        width: "100%",
        mb: 2,
        // ダークモード対応: テーマに応じて背景色を動的変更
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.08)" // ダーク時: 薄い白色
            : "grey.300", // ライト時: 従来の灰色
        "&:hover": {
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.12)" // ダーク時: ホバーで少し明るく
              : "grey.400", // ライト時: 従来の濃い灰色
        },
        // テキスト色もテーマ対応
        color: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.87)" // ダーク時: 高コントラスト白
            : "text.primary", // ライト時: デフォルトテキスト色
        "& .MuiChip-label": {
          fontWeight: 500,
        },
        // アイコンの色も統一
        "& .MuiChip-icon": {
          color: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.87)"
              : "inherit",
        },
      }}
    />
  );
};
