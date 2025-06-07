import { Box, Drawer, Typography } from "@mui/material";
import Link from "next/link";
import {
  Home,
  Straighten,
  AutoAwesomeMosaic,
  SpaceBar,
  FormatAlignJustify,
  SmartButton,
  Rtt,
  CropFree,
  Flip,
  Texture,
  Palette,
  DarkMode,
  Memory,
  AccountTree,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { useState } from "react";
import { SearchTypography } from "../SearchTypography";

type MenuItems = {
  title: string;
  path: string;
  children?: MenuItems;
  icon?: React.ReactNode;
}[];

const DRAWER_WIDTH = 280;
const CLOSE_DRAWER_WIDTH = 50;

const SideMenu = () => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isHover, setIsHover] = useState(false);
  const isOpen = isExpanded || isHover;
  const menuItems: MenuItems = [
    {
      title: "基本",
      path: "/base",
      children: [
        {
          title: "DOM",
          path: "/dom",
          icon: <AccountTree fontSize="small" />,
        },
        {
          title: "色",
          path: "/color",
          icon: <Palette fontSize="small" />,
        },
        {
          title: "長さの単位",
          path: "/length",
          icon: <Straighten fontSize="small" />,
        },
        {
          title: "配置(justify, align, place)",
          path: "/position",
          icon: <FormatAlignJustify fontSize="small" />,
        },
        {
          title: "オートレイアウト（FlexとGrid）",
          path: "/auto-layout",
          icon: <AutoAwesomeMosaic fontSize="small" />,
        },
        {
          title: "ラッパーコンポーネント",
          path: "/wrapper",
          icon: <CropFree fontSize="small" />,
        },
        {
          title: "Gap（要素間の間隔調整）",
          path: "/gap",
          icon: <SpaceBar fontSize="small" />,
        },
      ],
    },
    {
      title: "Components",
      path: "/components",
      children: [
        {
          title: "Button",
          path: "/button",
          icon: <SmartButton fontSize="small" />,
        },
        {
          title: "Skeleton",
          path: "/skeleton",
          icon: <Texture fontSize="small" />,
        },
        {
          title: "Theme",
          path: "/theme",
          icon: <DarkMode fontSize="small" />,
        },
        {
          title: "Typography",
          path: "/typography",
          icon: <Rtt fontSize="small" />,
        },
      ],
    },
    {
      title: "React",
      path: "/react",
      children: [
        {
          title: "メモ化 (useCallback, useMemo)",
          path: "/memoization",
          icon: <Memory fontSize="small" />,
        },
        {
          title: "state (useState, useRef)",
          path: "/state",
          icon: <CropFree fontSize="small" />,
        },
      ],
    },
  ];

  const handleOpen = () => {
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  const handleHover = () => {
    setIsHover(true);
  };

  const handleLeave = () => {
    setIsHover(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: isOpen ? DRAWER_WIDTH : CLOSE_DRAWER_WIDTH, // Drawerの幅を指定するためのプロパティ
          flexShrink: 0, // ウィンドウサイズが小さくなってもDrawerを縮小しないように
          "& .MuiDrawer-paper": {
            width: isOpen ? DRAWER_WIDTH : CLOSE_DRAWER_WIDTH, // Drawerの幅を指定するためのプロパティ. 上のwidthとの違いは
            boxSizing: "border-box",
            transition: "width 0.3s ease",
            overflowX: "hidden",
            whiteSpace: "nowrap",
          },
        }}
        variant="permanent"
        anchor="left"
        slotProps={{
          paper: {
            sx: {
              // ダークモード対応: テーマに応じて背景色を変更
              backgroundColor: "background.paper",
              // ダークモード時のボーダーを追加（オプション）
              borderRight: (theme) =>
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.12)"
                  : "1px solid rgba(0, 0, 0, 0.12)",
            },
            onMouseEnter: handleHover,
            onMouseLeave: handleLeave,
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              p: 2,
            }}
          >
            {isOpen && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    mb: 2,
                  }}
                >
                  <Link href="/">
                    <Typography variant="h6" display="flex" alignItems="center">
                      {<Home />}デザインドキュメント
                    </Typography>
                  </Link>
                  {isExpanded ? (
                    <Flip onClick={handleClose} sx={{ cursor: "pointer" }} />
                  ) : (
                    <Flip
                      onClick={handleOpen}
                      sx={{
                        transform: "rotate(180deg)",
                        cursor: "pointer",
                      }}
                    />
                  )}
                </Box>
                <SearchTypography />
              </>
            )}
          </Box>
          {isOpen &&
            menuItems.map((menuItem) => (
              <>
                <Link key={menuItem.path} href={menuItem.path} passHref>
                  <Typography
                    variant="body1"
                    sx={{
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      bgcolor:
                        router.pathname === menuItem.path ||
                        (menuItem.children &&
                          menuItem.children.some(
                            (child) =>
                              router.pathname ===
                              `${menuItem.path}${child.path}`
                          ))
                          ? "primary.main"
                          : "inherit",
                      color:
                        router.pathname === menuItem.path ||
                        (menuItem.children &&
                          menuItem.children.some(
                            (child) =>
                              router.pathname ===
                              `${menuItem.path}${child.path}`
                          ))
                          ? "primary.contrastText"
                          : "inherit",
                      borderRadius: 3,
                      cursor: "pointer",
                      transition: "background 0.2s, color 0.2s",
                      "&:hover": {
                        bgcolor: "primary.light",
                        color: "inherit",
                      },
                    }}
                  >
                    {menuItem.icon}
                    {menuItem.title}
                  </Typography>
                </Link>

                {menuItem.children && (
                  <Box sx={{ pl: 4 }}>
                    {menuItem.children.map((child) => (
                      <Link
                        key={`${menuItem.path}-child-${child.path}`}
                        href={`${menuItem.path}${child.path}`}
                        passHref
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            p: 1,
                            display: "flex",
                            alignItems: "center",
                            color:
                              router.pathname ===
                              `${menuItem.path}${child.path}`
                                ? "primary.main"
                                : "inherit",
                            textDecorationColor: "primary.main",
                            textUnderlineOffset: "3px",
                            cursor: "pointer",
                            transition: "background 0.2s, color 0.2s",
                            "&:hover": {
                              bgcolor: "primary.light",
                              borderRadius: 3,
                              color: "inherit",
                            },
                          }}
                        >
                          {child.icon}
                          {child.title}
                        </Typography>
                      </Link>
                    ))}
                  </Box>
                )}
              </>
            ))}
        </Box>
      </Drawer>
    </Box>
  );
};

export default SideMenu;
