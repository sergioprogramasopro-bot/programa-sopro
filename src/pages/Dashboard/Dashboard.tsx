import Layout from "../../components/Layout/Layout";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <Layout>
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: "bold",
          mb: 1,
        }}
      >
        Dashboard
      </Typography>

      <Typography
        variant="h6"
        component="p"
        sx={{
          color: "text.secondary",
          mb: 4,
        }}
      >
        Bem-vindo ao Sistema SOPRO Visitas Técnicas.
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2">
                Instituições
              </Typography>

              <Typography
                variant="h3"
                component="p"
                color="primary"
              >
                0
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2">
                Relatórios
              </Typography>

              <Typography
                variant="h3"
                component="p"
                color="primary"
              >
                0
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2">
                Técnicos
              </Typography>

              <Typography
                variant="h3"
                component="p"
                color="primary"
              >
                0
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 5 }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/novo-relatorio")}
        >
          Novo Relatório
        </Button>
      </Box>
    </Layout>
  );
}