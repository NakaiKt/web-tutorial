import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import React from "react";

export interface TypographyText {
  file: string;
  line: number;
  text: string;
}

export const useSearchTypography = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [typographyData, setTypographyData] = useState<TypographyText[]>([]);
  const theme = useTheme();

  useEffect(() => {
    if (isOpen && typographyData.length === 0) {
      fetch("/typographyTexts.json")
        .then((res) => res.json())
        .then((data) => setTypographyData(data))
        .catch((err) => console.error("Failed to load typography texts:", err));
    }
  }, [isOpen, typographyData.length]);

  // 検索ロジック
  const filtered = query
    ? typographyData.filter((item) => item.text.includes(query)).slice(0, 20)
    : [];

  // ハイライト関数
  const highlight = (
    text: string,
    query: string
  ): (string | React.ReactElement)[] => {
    if (!query) return [text];
    const parts = text.split(query);
    return parts.reduce((acc, part, idx) => {
      if (idx === 0) return [part];
      return [
        ...acc,
        React.createElement(
          "span",
          {
            key: idx,
            style: { backgroundColor: theme.palette.primary.light },
          },
          query
        ),
        part,
      ];
    }, [] as (string | React.ReactElement)[]);
  };

  const openSearch = () => setIsOpen(true);
  const closeSearch = () => {
    setIsOpen(false);
    setQuery("");
  };

  return {
    isOpen,
    query,
    setQuery,
    filtered,
    highlight,
    openSearch,
    closeSearch,
  };
};
