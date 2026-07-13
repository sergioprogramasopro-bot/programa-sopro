import {
  Dashboard,
  Description,
  Business,
  Person,
  History,
  BarChart,
  Settings,
} from "@mui/icons-material";

import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 260,
        height: "100vh",
        background: "#1565c0",
        color: "white",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          p: 3,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        SOPRO
      </Typography>

      <List>

        <ListItemButton onClick={() => navigate("/")}>
          <ListItemIcon sx={{ color: "white" }}>
            <Dashboard />
          </ListItemIcon>

          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/novo-relatorio")}>
          <ListItemIcon sx={{ color: "white" }}>
            <Description />
          </ListItemIcon>

          <ListItemText primary="Novo Relatório" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/instituicoes")}>
          <ListItemIcon sx={{ color: "white" }}>
            <Business />
          </ListItemIcon>

          <ListItemText primary="Instituições" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon sx={{ color: "white" }}>
            <Person />
          </ListItemIcon>

          <ListItemText primary="Técnicos" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon sx={{ color: "white" }}>
            <History />
          </ListItemIcon>

          <ListItemText primary="Histórico" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon sx={{ color: "white" }}>
            <BarChart />
          </ListItemIcon>

          <ListItemText primary="Indicadores" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon sx={{ color: "white" }}>
            <Settings />
          </ListItemIcon>

          <ListItemText primary="Configurações" />
        </ListItemButton>

      </List>
    </Box>
  );
}