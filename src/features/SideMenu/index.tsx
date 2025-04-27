import { Box, Drawer, Typography, CssBaseline } from "@mui/material";
import Link from "next/link";

type MenuItems = {
  title: string;
  path: string;
  children?: MenuItems;
}[];

const DRAWER_WIDTH = 280;

const SideMenu = () => {
  const menuItems: MenuItems = [
    {
      title: "Tailwind",
      path: "/tailwind",
      children: [
        { title: "Flex", path: "/flex" },
        { title: "Background", path: "/background" },
      ],
    },
    {
      title: "MUI",
      path: "/mui",
      children: [{ title: "Button", path: "/button" }],
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
        <Typography variant="h6" noWrap component="div" sx={{ p: 2 }}>
          ドキュメント
        </Typography>
        <CssBaseline />
        {menuItems.map((menuItem) => (
          <>
            <Link key={menuItem.path} href={menuItem.path} passHref>
              <Typography variant="body1" sx={{ p: 2 }}>
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
                    <Typography variant="body2" sx={{ p: 1 }}>
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
