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
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { useState } from "react";

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
      title: "MUI",
      path: "/mui",
      children: [
        {
          title: "Button",
          path: "/button",
          icon: <SmartButton fontSize="small" />,
        },
        {
          title: "Typography",
          path: "/typography",
          icon: <Rtt fontSize="small" />,
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
              backgroundColor: "grey.100",
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
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
            }}
          >
            {isOpen && (
              <>
                <Link href="/">
                  <Typography variant="h6" display="flex" alignItems="center">
                    {<Home />}雑ドキュメント
                  </Typography>
                </Link>
                {isExpanded ? (
                  <>
                    <Flip onClick={handleClose} />
                  </>
                ) : (
                  <Flip
                    onClick={handleOpen}
                    sx={{
                      transform: "rotate(180deg)",
                    }}
                  />
                )}
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
