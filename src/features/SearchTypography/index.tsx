import React from "react";
import { SearchButton } from "./SearchButton";
import { SearchModal } from "./SearchModal";
import { useSearchTypography } from "./hooks/useSearchTypography";

export const SearchTypography = () => {
  const {
    isOpen,
    query,
    setQuery,
    filtered,
    highlight,
    openSearch,
    closeSearch,
  } = useSearchTypography();

  return (
    <>
      <SearchButton onClick={openSearch} />
      <SearchModal
        isOpen={isOpen}
        onClose={closeSearch}
        query={query}
        setQuery={setQuery}
        filtered={filtered}
        highlight={highlight}
      />
    </>
  );
};

// 個別コンポーネントもエクスポート
export { SearchButton } from "./SearchButton";
export { SearchModal } from "./SearchModal";
export { useSearchTypography } from "./hooks/useSearchTypography";
export type { TypographyText } from "./hooks/useSearchTypography";
export { getPageInfo, getDisplayName } from "./utils/pathMapping";
export type { PageInfo } from "./utils/pathMapping";
