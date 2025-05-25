import { Box, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";

interface SearchButtonProps {
  onClick: () => void;
}

export const SearchButton = ({ onClick }: SearchButtonProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        p: 1,
        borderRadius: 2,
        transition: "background 0.2s",
        mb: 3,
      }}
      onClick={onClick}
    >
      <Search fontSize="small" sx={{ mr: 0.5 }} />
      <Typography variant="body1">検索</Typography>
    </Box>
  );
};
