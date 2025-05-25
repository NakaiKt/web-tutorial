import {
  Box,
  Modal,
  TextField,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { TypographyText } from "./hooks/useSearchTypography";
import { getPageInfo, getDisplayName } from "./utils/pathMapping";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  setQuery: (query: string) => void;
  filtered: TypographyText[];
  highlight: (text: string, query: string) => (string | React.ReactElement)[];
}

export const SearchModal = ({
  isOpen,
  onClose,
  query,
  setQuery,
  filtered,
  highlight,
}: SearchModalProps) => {
  const router = useRouter();

  const handleResultClick = (item: TypographyText) => {
    const pageInfo = getPageInfo(item.file);
    if (pageInfo) {
      // ページに遷移（検索テキストと行番号をパラメータで渡す）
      router.push({
        pathname: pageInfo.url,
        query: {
          highlight: query,
          line: item.line.toString(),
        },
      });
      // モーダルを閉じる
      onClose();
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="search-modal-title"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          width: "50vw",
          height: "50vh",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          label="検索"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ mb: 2 }}
          autoFocus
        />
        <List sx={{ overflowY: "auto", flex: 1 }}>
          {filtered.length === 0 && query && <ListItem>該当なし</ListItem>}
          {filtered.map((item, idx) => {
            const pageInfo = getPageInfo(item.file);
            const displayName = getDisplayName(item.file);

            return (
              <ListItem
                key={idx}
                sx={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  borderBottom: "1px solid #eee",
                  py: 2,
                  cursor: pageInfo ? "pointer" : "default",
                  "&:hover": pageInfo
                    ? {
                        bgcolor: "action.hover",
                      }
                    : {},
                }}
                onClick={() => handleResultClick(item)}
              >
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {highlight(item.text, query)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {displayName} (行: {item.line})
                </Typography>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Modal>
  );
};
