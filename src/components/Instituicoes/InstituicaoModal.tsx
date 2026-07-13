import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  onSalvar: () => void;

  nome: string;
  cidade: string;
  estado: string;
  endereco: string;
  contato: string;
  telefone: string;

  setNome: (valor: string) => void;
  setCidade: (valor: string) => void;
  setEstado: (valor: string) => void;
  setEndereco: (valor: string) => void;
  setContato: (valor: string) => void;
  setTelefone: (valor: string) => void;
}

export default function InstituicaoModal({
  open,
  onClose,
  onSalvar,

  nome,
  cidade,
  estado,
  endereco,
  contato,
  telefone,

  setNome,
  setCidade,
  setEstado,
  setEndereco,
  setContato,
  setTelefone,
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Nova Instituição
      </DialogTitle>

      <DialogContent>

        <Grid container spacing={2} sx={{ mt: 1 }}>

          <Grid size={{ xs: 12 }}>
            <TextField
              label="Nome da instituição"
              fullWidth
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <TextField
              label="Cidade"
              fullWidth
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <TextField
              label="Estado"
              fullWidth
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              label="Endereço"
              fullWidth
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <TextField
              label="Contato"
              fullWidth
              value={contato}
              onChange={(e) => setContato(e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <TextField
              label="Telefone"
              fullWidth
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </Grid>

        </Grid>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancelar
        </Button>

        <Button
          variant="contained"
          onClick={onSalvar}
        >
          Salvar
        </Button>

      </DialogActions>

    </Dialog>
  );
}