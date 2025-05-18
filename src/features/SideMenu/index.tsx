import { Box, Drawer, Typography } from "@mui/material";
import Link from "next/link";
import {
  Home,
  Straighten,
  AutoAwesomeMosaic,
  SpaceBar,
  FormatAlignJustify,
  Yard,
  SmartButton,
  Rtt,
} from "@mui/icons-material";
import { useRouter } from "next/router";

type MenuItems = {
  title: string;
  path: string;
  children?: MenuItems;
  icon?: React.ReactNode;
}[];

const DRAWER_WIDTH = 280;

const SideMenu = () => {
  const router = useRouter();
  const menuItems: MenuItems = [
    {
      title: "ホーム",
      path: "/",
      icon: <Home />,
    },
    {
      title: "CSS(Tailwind)",
      path: "/tailwind",
      children: [
        {
          title: "長さの単位",
          path: "/length",
          icon: <Straighten fontSize="small" />,
        },
        {
          title: "Flex（横並び・縦並び）",
          path: "/flex",
          icon: <AutoAwesomeMosaic fontSize="small" />,
        },
        {
          title: "Gap（要素間の間隔調整）",
          path: "/gap",
          icon: <SpaceBar fontSize="small" />,
        },
        {
          title: "配置",
          path: "/position",
          icon: <FormatAlignJustify fontSize="small" />,
        },
        {
          title: "Background",
          path: "/background",
          icon: <Yard fontSize="small" />,
        },
        {
          title: "オートレイアウト（FlexとGrid）",
          path: "/auto-layout",
          icon: <AutoAwesomeMosaic fontSize="small" />,
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

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: DRAWER_WIDTH, // Drawerの幅を指定するためのプロパティ
          flexShrink: 0, // ウィンドウサイズが小さくなってもDrawerを縮小しないように
          "& .MuiDrawer-paper": {
            // Drawerのスタイルを指定するためのプロパティ
            width: DRAWER_WIDTH, // Drawerの幅を指定するためのプロパティ. 上のwidthとの違いは
            boxSizing: "border-box", //
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {menuItems.map((menuItem) => (
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
                          router.pathname === `${menuItem.path}${child.path}`
                      ))
                      ? "primary.main"
                      : "inherit",
                  color:
                    router.pathname === menuItem.path ||
                    (menuItem.children &&
                      menuItem.children.some(
                        (child) =>
                          router.pathname === `${menuItem.path}${child.path}`
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
                          router.pathname === `${menuItem.path}${child.path}`
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
      </Drawer>
    </Box>
  );
};

export default SideMenu;
