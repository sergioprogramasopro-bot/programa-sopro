import { useState } from "react";
import {
  Box,
  Drawer,
  Toolbar,
  Typography,
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
import Historico from "./Historico";

const drawerWidth = 220;

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
            background: "#ffffff",
            borderRight: "1px solid #dbe5f1",
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
              width: "160px",
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
                background: "#dceeff",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#1565c0", minWidth: 40 }}>
              <ApartmentIcon />
            </ListItemIcon>

            <ListItemText
              primary={
                <Typography
                  sx={{
                    color: "#123c7a",
                    fontWeight: 600,
                  }}
                >
                  Instituições
                </Typography>
              }
            />
          </ListItemButton>

          <ListItemButton
            selected={tela === "visitas"}
            onClick={() => setTela("visitas")}
            sx={{
              borderRadius: 2,
              mb: 1,
              "&.Mui-selected": {
                background: "#dceeff",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#1565c0", minWidth: 40 }}>
              <AssignmentIcon />
            </ListItemIcon>

            <ListItemText
              primary={
                <Typography
                  sx={{
                    color: "#123c7a",
                    fontWeight: 600,
                  }}
                >
                  Visitas
                </Typography>
              }
            />
          </ListItemButton>

          <ListItemButton
            selected={tela === "historico"}
            onClick={() => setTela("historico")}
            sx={{
              borderRadius: 2,
              mb: 1,
              "&.Mui-selected": {
                background: "#dceeff",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#1565c0", minWidth: 40 }}>
              <HistoryIcon />
            </ListItemIcon>

            <ListItemText
              primary={
                <Typography
                  sx={{
                    color: "#123c7a",
                    fontWeight: 600,
                  }}
                >
                  Histórico
                </Typography>
              }
            />
          </ListItemButton>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          background:
            "linear-gradient(135deg,#eef5ff 0%,#f7fbff 50%,#eef5ff 100%)",
          minHeight: "100vh",
        }}
      >
        {tela === "instituicoes" && <Instituicoes />}

        {tela === "visitas" && <Visitas />}

        {tela === "historico" && <Historico />}
      </Box>
    </Box>
  );
}