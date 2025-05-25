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
        backgroundColor: "grey.300",
        "&:hover": {
          backgroundColor: "grey.400",
        },
        "& .MuiChip-label": {
          fontWeight: 500,
        },
      }}
    />
  );
};
