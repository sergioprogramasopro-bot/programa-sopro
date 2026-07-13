import { useState } from "react";

import Layout from "../../components/Layout/Layout";
import InstituicaoModal from "../../components/Instituicoes/InstituicaoModal";
import { supabase } from "../../services/supabase";

import {
  Typography,
  Button,
  Box,
  TextField,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

interface Instituicao {
  id: number;
  nome: string;
  cidade: string;
  estado: string;
  endereco: string;
  contato: string;
  telefone: string;
}

export default function Instituicoes() {
  const [abrirModal, setAbrirModal] = useState(false);

  const [instituicoes, setInstituicoes] = useState<Instituicao[]>([
    {
      id: 1,
      nome: "Hospital Municipal",
      cidade: "São Paulo",
      estado: "SP",
      endereco: "",
      contato: "",
      telefone: "",
    },
    {
      id: 2,
      nome: "UBS Central",
      cidade: "Campinas",
      estado: "SP",
      endereco: "",
      contato: "",
      telefone: "",
    },
  ]);

  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [endereco, setEndereco] = useState("");
  const [contato, setContato] = useState("");
  const [telefone, setTelefone] = useState("");

  function limparFormulario() {
    setNome("");
    setCidade("");
    setEstado("");
    setEndereco("");
    setContato("");
    setTelefone("");
  }

  async function salvarInstituicao() {
  if (
    nome.trim() === "" ||
    cidade.trim() === "" ||
    estado.trim() === ""
  ) {
    alert("Preencha Nome, Cidade e Estado.");
    return;
  }

  const { data, error } = await supabase
    .from("instituicoes")
    .insert([
      {
        nome,
        cidade,
        estado,
        endereco,
        responsavel: contato,
        telefone,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    alert("Erro ao salvar instituição.");
    return;
  }

  setInstituicoes([
    ...instituicoes,
    {
      id: data[0].id,
      nome,
      cidade,
      estado,
      endereco,
      contato,
      telefone,
    },
  ]);

  limparFormulario();
  setAbrirModal(false);
}

  return (
    <Layout>
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: "bold",
          mb: 3,
        }}
      >
        Instituições
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <TextField
          label="Pesquisar instituição"
          size="small"
          sx={{ width: 350 }}
        />

        <Button
          variant="contained"
          onClick={() => setAbrirModal(true)}
        >
          Nova Instituição
        </Button>
      </Box>

      <Paper>
        <Table>

          <TableHead>

            <TableRow>

              <TableCell>ID</TableCell>

              <TableCell>Nome</TableCell>

              <TableCell>Cidade</TableCell>

              <TableCell>Estado</TableCell>

              <TableCell align="center">
                Ações
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {instituicoes.map((inst) => (

              <TableRow key={inst.id}>

                <TableCell>{inst.id}</TableCell>

                <TableCell>{inst.nome}</TableCell>

                <TableCell>{inst.cidade}</TableCell>

                <TableCell>{inst.estado}</TableCell>

                <TableCell align="center">

                  <Button size="small">
                    Editar
                  </Button>

                  <Button
                    size="small"
                    color="error"
                  >
                    Excluir
                  </Button>

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>
      </Paper>

      <InstituicaoModal
        open={abrirModal}
        onClose={() => setAbrirModal(false)}
        onSalvar={salvarInstituicao}
        nome={nome}
        cidade={cidade}
        estado={estado}
        endereco={endereco}
        contato={contato}
        telefone={telefone}
        setNome={setNome}
        setCidade={setCidade}
        setEstado={setEstado}
        setEndereco={setEndereco}
        setContato={setContato}
        setTelefone={setTelefone}
      />

    </Layout>
  );
}