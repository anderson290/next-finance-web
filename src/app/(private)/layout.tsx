"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/Inbox";
// import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  List as ListIcon,
  ChartLine,
  CaretLeft,
  GithubLogo,
  SignOut
} from "phosphor-react";
import { signOut } from "next-auth/react";

const drawerWidth = 240;
const miniDrawerWidth = 64;

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(true);

  const menuItems = [
    { text: "Dashboard", href: "/dashboard", icon: <ChartLine size={24} /> },
    { text: "Github", href: "/github", icon: <GithubLogo size={24} /> },
    // adicione novos itens aqui
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : miniDrawerWidth,
          flexShrink: 0,
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          transition: (theme) =>
            theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : miniDrawerWidth,
            transition: (theme) =>
              theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            overflowX: "hidden",
          },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: open ? "flex-end" : "center",
            px: [1],
          }}
        >
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <CaretLeft size={24} /> : <ListIcon size={24} />}
          </IconButton>
        </Toolbar>
        <List>
          {menuItems.map(({ text, href, icon }) => (
            <Link
              key={href}
              href={href}
              passHref
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton
                component="a"
                selected={pathname === href}
                sx={{
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  height: "3rem"
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {icon}
                </ListItemIcon>
                {open && <ListItemText primary={text} />}
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${open ? drawerWidth : miniDrawerWidth}px)`,
            ml: `${open ? drawerWidth : miniDrawerWidth}px`,
            transition: (theme) =>
              theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap>
              Next Finance
            </Typography>

            <Box sx={{ flexGrow: 1 }} />
            <IconButton color="inherit" onClick={() => signOut()}>
              <SignOut size={24} />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Toolbar />
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}
