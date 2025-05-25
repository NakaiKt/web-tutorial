export interface PageInfo {
  title: string;
  section?: string;
  url: string;
  displayName: string;
}

// ファイルパス → ページ情報のマッピング
export const pathToPageMapping: Record<string, PageInfo> = {
  // Base系
  "Base/Length/index.tsx": {
    title: "長さの単位",
    section: "基本",
    url: "/base/length",
    displayName: "基本 > 長さの単位",
  },
  "Base/Position/index.tsx": {
    title: "配置(justify, align, place)",
    section: "基本",
    url: "/base/position",
    displayName: "基本 > 配置(justify, align, place)",
  },
  "Base/AutoLayout/index.tsx": {
    title: "オートレイアウト（FlexとGrid）",
    section: "基本",
    url: "/base/auto-layout",
    displayName: "基本 > オートレイアウト（FlexとGrid）",
  },
  "Base/Wrapper/index.tsx": {
    title: "ラッパーコンポーネント",
    section: "基本",
    url: "/base/wrapper",
    displayName: "基本 > ラッパーコンポーネント",
  },
  "Base/Gap/index.tsx": {
    title: "Gap（要素間の間隔調整）",
    section: "基本",
    url: "/base/gap",
    displayName: "基本 > Gap（要素間の間隔調整）",
  },
  "Base/Layout/index.tsx": {
    title: "レイアウト",
    section: "基本",
    url: "/base/layout",
    displayName: "基本 > レイアウト",
  },

  // MUI系
  "Mui/Button/index.tsx": {
    title: "Button",
    section: "MUI",
    url: "/mui/button",
    displayName: "MUI > Button",
  },
  "Mui/Typography/index.tsx": {
    title: "Typography",
    section: "MUI",
    url: "/mui/typography",
    displayName: "MUI > Typography",
  },
};

// ファイルパスからページ情報を取得
export const getPageInfo = (filePath: string): PageInfo | null => {
  // ファイルパスを正規化（/src/contents/ を除去）
  const normalizedPath = filePath.replace(/.*\/contents\//, "");
  return pathToPageMapping[normalizedPath] || null;
};

// 表示名を取得（フォールバック付き）
export const getDisplayName = (filePath: string): string => {
  const pageInfo = getPageInfo(filePath);
  if (pageInfo) {
    return pageInfo.displayName;
  }

  // フォールバック：ファイルパスから推測
  const normalizedPath = filePath
    .replace(/.*\/contents\//, "")
    .replace("/index.tsx", "");
  return normalizedPath.replace(/\//g, " > ");
};
