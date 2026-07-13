import { useState } from "react";
import {
  Box,
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import ApartmentIcon from "@mui/icons-material/Apartment";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HistoryIcon from "@mui/icons-material/History";

import Instituicoes from "./Instituicoes";
import Visitas from "./Visitas";

const drawerWidth = 240;

export default function App() {
  const [tela, setTela] = useState("visitas");

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#F8F9FA",
            borderRight: "1px solid #E5E7EB",
          },
        }}
      >
        <Toolbar />

        <Box
          sx={{
            textAlign: "center",
            py: 3,
          }}
        >
          <img
            src="/logo.png"
            alt="Programa SOPRO"
            style={{
              width: "170px",
              height: "auto",
            }}
          />
        </Box>

        <List sx={{ px: 1 }}>
          <ListItemButton
            selected={tela === "instituicoes"}
            onClick={() => setTela("instituicoes")}
            sx={{
              borderRadius: 2,
              mb: 1,
              "&.Mui-selected": {
                background: "#E3F2FD",
              },
              "&.Mui-selected:hover": {
                background: "#D7ECFC",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#1565C0" }}>
              <ApartmentIcon />
            </ListItemIcon>

            <ListItemText
              primary="Instituições"
              primaryTypographyProps={{
                fontWeight: 600,
                color: "#374151",
              }}
            />
          </ListItemButton>

          <ListItemButton
            selected={tela === "visitas"}
            onClick={() => setTela("visitas")}
            sx={{
              borderRadius: 2,
              mb: 1,
              "&.Mui-selected": {
                background: "#E3F2FD",
              },
              "&.Mui-selected:hover": {
                background: "#D7ECFC",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#1565C0" }}>
              <AssignmentIcon />
            </ListItemIcon>

            <ListItemText
              primary="Visitas"
              primaryTypographyProps={{
                fontWeight: 600,
                color: "#374151",
              }}
            />
          </ListItemButton>

          <ListItemButton
            disabled
            sx={{
              borderRadius: 2,
            }}
          >
            <ListItemIcon sx={{ color: "#9CA3AF" }}>
              <HistoryIcon />
            </ListItemIcon>

            <ListItemText
              primary="Histórico"
              primaryTypographyProps={{
                color: "#9CA3AF",
              }}
            />
          </ListItemButton>
        </List>
      </Drawer>

      <Box
  component="main"
  sx={{
    flexGrow: 1,
    p: 5,
    background: `
      linear-gradient(
        135deg,
        #F5F9FF 0%,
        #EEF4FF 25%,
        #E6F0FF 50%,
        #EEF4FF 75%,
        #F8FBFF 100%
      )
    `,
    minHeight: "100vh",
  }}
>
        {tela === "instituicoes" && <Instituicoes />}
        {tela === "visitas" && <Visitas />}
      </Box>
    </Box>
  );
}