import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useTheme } from "@mui/material/styles";

type Props = {
  items: string[];
  style?: "disc" | "number" | "check" | "cross";
  color?: "primary" | "success" | "info" | "warning" | "error";
};

/**
 * 箇条書きのリストを表示するコンポーネント
 *
 * items: 箇条書きのリストを表示する配列
 * style: 箇条書きのスタイル
 *        - disc: デフォルトの箇条書き
 *        - number: 番号付きの箇条書き
 *        - check: チェックマーク付きの箇条書き
 *        - cross: チェックマーク付きの箇条書き
 * color: 箇条書きの色
 *        - primary: デフォルトの色
 *        - success: 成功時の色
 *        - info: 情報時の色
 *        - warning: 警告時の色
 *        - error: エラー時の色
 */
const BulletPoints = ({ items, style = "disc", color = "primary" }: Props) => {
  const theme = useTheme();

  const getColor = () => {
    switch (color) {
      case "success":
        return theme.palette.success.main;
      case "info":
        return theme.palette.info.main;
      case "warning":
        return theme.palette.warning.main;
      case "error":
        return theme.palette.error.main;
      default:
        return theme.palette.primary.main;
    }
  };
  const renderIcon = (type: "check" | "cross") => {
    if (type === "check") {
      return <CheckCircleIcon sx={{ color: getColor(), fontsize: 20 }} />;
    }
    if (type === "cross") {
      return <CancelIcon sx={{ color: getColor(), fontsize: 20 }} />;
    }
    return null;
  };
  const listStyleType =
    style === "disc" ? "disc" : style === "number" ? "decimal" : "none";

  return (
    <List
      component={style === "number" ? "ol" : "ul"}
      disablePadding
      sx={{ pl: 2, listStyleType: listStyleType }}
    >
      {items.map((item, index) => (
        <ListItem
          key={index}
          component="li"
          disableGutters
          sx={{
            display: "list-item",
            py: 0.2,
            px: 0,
            ...(style === "check" || style === "cross"
              ? { display: "flex", alignItems: "center", listStyleType: "none" }
              : {}),
          }}
        >
          {style === "check" || style === "cross" ? (
            <ListItemIcon sx={{ minWith: 28 }}>
              {renderIcon(style)}
            </ListItemIcon>
          ) : null}{" "}
          <ListItemText
            slotProps={{
              primary: {
                variant: "body2",
                sx: { my: 0 },
              },
            }}
          >
            <span dangerouslySetInnerHTML={{ __html: item }} />
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default BulletPoints;
