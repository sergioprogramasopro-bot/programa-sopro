import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

interface Instituicao {
  id: number;
  nome: string;
  cidade: string;
  estado: string;
}

export default function NovoRelatorio() {
  const navigate = useNavigate();

  const [instituicoes, setInstituicoes] = useState<Instituicao[]>([]);
  const [instituicaoSelecionada, setInstituicaoSelecionada] = useState("");

  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const [tecnico, setTecnico] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    const dados = localStorage.getItem("instituicoes");

    if (dados) {
      setInstituicoes(JSON.parse(dados));
    }
  }, []);

  function selecionarInstituicao(id: string) {
    setInstituicaoSelecionada(id);

    const inst = instituicoes.find(
      (item) => item.id === Number(id)
    );

    if (inst) {
      setCidade(inst.cidade);
      setEstado(inst.estado);
    } else {
      setCidade("");
      setEstado("");
    }
  }

  const campo = {
    width: "100%",
    padding: "12px",
    marginTop: "5px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    boxSizing: "border-box" as const,
  };

  const botao = {
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "14px 30px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  };

  return (
    <Layout>
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          background: "white",
          padding: 40,
          borderRadius: 12,
          boxShadow: "0 0 20px rgba(0,0,0,.08)",
        }}
      >
        <h1 style={{ color: "#2563eb", marginBottom: 30 }}>
          Novo Relatório
        </h1>

        <label>Instituição</label>

        <select
          style={campo}
          value={instituicaoSelecionada}
          onChange={(e) => selecionarInstituicao(e.target.value)}
        >
          <option value="">Selecione uma instituição</option>

          {instituicoes.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nome}
            </option>
          ))}
        </select>

        <label>Cidade</label>

        <input
          style={campo}
          value={cidade}
          readOnly
        />

        <label>Estado</label>

        <input
          style={campo}
          value={estado}
          readOnly
        />

        <label>Técnico</label>

        <input
          style={campo}
          value={tecnico}
          onChange={(e) => setTecnico(e.target.value)}
        />

        <label>Responsável</label>

        <input
          style={campo}
          value={responsavel}
          onChange={(e) => setResponsavel(e.target.value)}
        />

        <label>Data da Visita</label>

        <input
          type="date"
          style={campo}
          value={data}
          onChange={(e) => setData(e.target.value)}
        />

        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: 30,
          }}
        >
          <button
            style={{
              ...botao,
              background: "#6b7280",
            }}
            onClick={() => navigate("/")}
          >
            Voltar
          </button>

          <button style={botao}>
            Salvar Relatório
          </button>
        </div>
      </div>
    </Layout>
  );
}