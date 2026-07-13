import { Box } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <Box sx={{ display: "flex" }}>

      <Sidebar />

      <Box
        sx={{
          flex: 1,
          background: "#f5f7fb",
          minHeight: "100vh",
          p: 4,
        }}
      >
        {children}
      </Box>

    </Box>
  );
}